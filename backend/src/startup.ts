import {
  CreateBucketCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import {
  CreateQueueCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { s3, sqs } from "./services/aws";

async function ensureBucket(name: string) {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: name }));
    console.log(`Bucket ${name} already exists`);
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: name }));
    console.log(`Bucket ${name} created`);
  }
}

async function ensureQueue(name: string) {
  try {
    const res = await sqs.send(new GetQueueUrlCommand({ QueueName: name }));
    console.log(`Queue ${name} already exists`);
    return res.QueueUrl;
  } catch {
    const res = await sqs.send(new CreateQueueCommand({ QueueName: name }));
    console.log(`Queue ${name} created`);
    return res.QueueUrl;
  }
}

export async function initAWS() {
  await ensureBucket(process.env.S3_BUCKET_NAME!);
  await ensureQueue(process.env.SQS_QUEUE_NAME!);
}
