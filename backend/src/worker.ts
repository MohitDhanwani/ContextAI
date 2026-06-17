import "dotenv/config";
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { db } from "./db";
import { pdfs } from "./db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

const sqs = new SQSClient({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.AWS_ENDPOINT || "http://localhost:4566",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
});

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.AWS_ENDPOINT || "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
});

const QUEUE_URL = process.env.SQS_QUEUE_URL!;

async function processJob(body: string, receiptHandle: string) {
  const { pdfId, s3Key } = JSON.parse(body);
  const tmpPath = path.join("/tmp", `${pdfId}.pdf`);

  try {
    const s3Res = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: s3Key,
      })
    );
    const bytes = await (s3Res.Body as any).transformToByteArray();
    fs.writeFileSync(tmpPath, bytes);

    const loader = new PDFLoader(tmpPath);
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitDocuments(docs);

    chunks.forEach((chunk) => {
      chunk.metadata.pdf_id = pdfId;
    });

    const embeddings = new OpenAIEmbeddings({
      model: "openai/text-embedding-3-small",
      apiKey: process.env.GITHUB_TOKEN,
      configuration: {
        baseURL: "https://models.github.ai/inference",
      },
    });

    await QdrantVectorStore.fromDocuments(chunks, embeddings, {
      url: process.env.QDRANT_URL!,
      collectionName: process.env.QDRANT_COLLECTION!,
    });

    await db.update(pdfs).set({ status: "ready" }).where(eq(pdfs.id, pdfId));
    console.log(`[Worker] PDF ${pdfId} processed successfully`);
  } catch (err) {
    console.error(`[Worker] Failed to process PDF ${pdfId}:`, err);
    await db.update(pdfs).set({ status: "failed" }).where(eq(pdfs.id, pdfId));
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);

    await sqs.send(
      new DeleteMessageCommand({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: receiptHandle,
      })
    );
  }
}

async function pollQueue() {
  console.log("[Worker] Starting SQS polling...");
  while (true) {
    try {
      const res = await sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: QUEUE_URL,
          MaxNumberOfMessages: 1,
          WaitTimeSeconds: 10,
        })
      );

      if (res.Messages && res.Messages.length > 0) {
        const msg = res.Messages[0];
        await processJob(msg.Body!, msg.ReceiptHandle!);
      }
    } catch (err) {
      console.error("[Worker] Poll error:", err);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

pollQueue().catch(console.error);
