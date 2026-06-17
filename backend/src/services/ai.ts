import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import "dotenv/config";

export async function getRelevantChunks(
  userQuery: string,
  pdfId: string
): Promise<string> {
  const embeddings = new OpenAIEmbeddings({
    model: "openai/text-embedding-3-small",
    apiKey: process.env.GITHUB_TOKEN,
    configuration: {
      baseURL: "https://models.github.ai/inference",
    },
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL!,
      collectionName: process.env.QDRANT_COLLECTION!,
    }
  );

  const retriever = vectorStore.asRetriever({
    k: 3,
    filter: {
      must: [{ key: "metadata.pdf_id", match: { value: pdfId } }],
    },
  });

  const docs = await retriever.invoke(userQuery);
  return JSON.stringify(docs.map((d) => d.pageContent));
}

export const openaiClient = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});
