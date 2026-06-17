import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initAWS } from "./startup";
import { authRouter } from "./routes/auth";
import { pdfRouter } from "./routes/pdf";
import { sessionRouter } from "./routes/session";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/session", sessionRouter);

async function main() {
  await initAWS();
  
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main().catch(console.error);
