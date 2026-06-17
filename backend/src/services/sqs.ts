import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqs } from "./aws";

export async function enqueuePdfJob(payload: {
  pdfId: string;
  s3Key: string;
  userId: string;
}) {
  await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL!,
      MessageBody: JSON.stringify(payload),
    })
  );
}
