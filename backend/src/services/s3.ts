import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./aws";
import { v4 as uuidv4 } from "uuid";

export async function uploadPdfToS3(
  fileBuffer: Buffer,
  userId: string,
  originalName: string
): Promise<{ s3Key: string; s3Url: string }> {
  const s3Key = `pdfs/${userId}/${uuidv4()}-${originalName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: "application/pdf",
    })
  );

  const endpoint = process.env.AWS_ENDPOINT || "http://localhost:4566";
  const s3Url = `${endpoint}/${process.env.S3_BUCKET_NAME}/${s3Key}`;
  return { s3Key, s3Url };
}
