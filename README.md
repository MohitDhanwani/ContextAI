# 📄 PDF Chat RAG Application

Welcome to the PDF Chat RAG (Retrieval-Augmented Generation) project! 

## 👋 What is this project?
This application allows users to upload PDF documents and have intelligent conversations with them. Instead of just searching for keywords, the app reads the document, understands the context, and uses AI to answer your questions based *strictly* on the content of the PDF.

## 🏗 System Design 

Here is how the magic happens behind the scenes:

1. **The User Interface**: Built with Next.js, this is where you log in, upload your PDFs, and chat.
2. **The API Server**: An Express server that handles your requests. When you upload a PDF, the server securely saves the file and quickly replies so you aren't left waiting.
3. **The Background Worker**: A separate process running alongside the server. It listens for new PDFs, reads the text out of them, and breaks the text down into small chunks.
4. **The AI Brain**: We use LangChain and OpenAI to convert these text chunks into "embeddings" (mathematical representations of the text) and store them in a specialized Vector Database (Qdrant).
5. **The Chat**: When you ask a question, the server converts your question into an embedding, searches Qdrant for the most relevant text chunks from your PDF, and sends that context to the AI to generate a human-like answer.

## 💻 Tech Stack
- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Drizzle ORM
- **AI & LLMs**: LangChain, OpenAI
- **Databases**: 
  - **NeonDB (PostgreSQL)**: For user accounts and relational data.
  - **Qdrant**: Vector database for storing AI embeddings.
  - **Redis**: For rate limiting and caching.
- **Infrastructure**: AWS S3 (storage) and SQS (queues) — running locally via Docker!

## 🚀 How to Set Up & Run Locally

### 1. Prerequisites
Make sure you have Node.js and Docker installed on your machine.

### 2. Start the Local Infrastructure
We use Docker to spin up our databases and mock AWS services so you don't have to pay for cloud hosting during development.

```bash
cd backend
docker-compose up -d
```
This starts Qdrant, Redis, and our local AWS environment.

### 3. Environment Variables
You'll need to create two environment files.

**Backend (`backend/.env`):**
Create this file in the `backend` folder and add the following:
```env
# ─── GitHub AI Inference (REQUIRED) ───────────────────────────────────────────
GITHUB_TOKEN=your_github_token

# ─── NeonDB (PostgreSQL) ──────────────────────────────────────────────────────
DATABASE_URL=your_neondb_postgres_url

# ─── JWT ──────────────────────────────────────────────────────────────────────
JWT_SECRET=supersecret123456789

# ─── AWS / LocalStack ─────────────────────────────────────────────────────────
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_ENDPOINT=http://localhost:4566
S3_BUCKET_NAME=pdf-chat-bucket
SQS_QUEUE_NAME=pdf-processing-queue
SQS_QUEUE_URL=http://localhost:4566/000000000000/pdf-processing-queue

# ─── Redis & Qdrant & Server ──────────────────────────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=pdf-chat
PORT=8000
```

**Frontend (`frontend/.env.local`):**
Create this file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run the Backend
The backend is actually two things: the API server and the background worker. We've set up a script to run them both at the same time.

```bash
cd backend
npm install
npm run dev
```

### 5. Run the Frontend
Open a new terminal tab and start the frontend UI:

```bash
cd frontend
npm install
npm run dev
```
Now, head over to `http://localhost:3000` in your browser and you're good to go!

---

## ☁️ How We Use AWS Services Locally 
One of the coolest parts of this setup is how we handle AWS services without actually using AWS.

In a real production environment, you would use AWS S3 to store files and AWS SQS to queue up background jobs. To replicate this locally (and for free), we use **Floci** (a lightweight LocalStack alternative) running inside our Docker container.

**How we tied it all together:**
1. **Routing Traffic Local:** In our backend `.env`, we set the `AWS_ENDPOINT` to `http://localhost:4566`. We also use dummy credentials (`AWS_ACCESS_KEY_ID=test`). This tricks the AWS SDK into talking to our local Docker container instead of the real Amazon servers.
2. **S3 Uploads:** When you upload a PDF, the backend uses standard AWS code to save the file, but it gets saved into our local `pdf-chat-bucket`.
3. **SQS Queues:** After saving the file, the server drops a message into our local `pdf-processing-queue` saying, *"Hey, there's a new file to process!"*
4. **The Worker:** Our background worker script is constantly polling this local SQS queue. When it sees the message, it grabs the PDF from the local S3 bucket, does all the heavy AI processing, and saves the embeddings to Qdrant.

This gives us the exact same architecture we'd use in production, meaning when it's time to deploy, we barely have to change any code!
