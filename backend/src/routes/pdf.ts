import { Router, Request, Response } from "express";
import multer from "multer";
import { db } from "../db";
import { pdfs } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { uploadPdfToS3 } from "../services/s3";
import { enqueuePdfJob } from "../services/sqs";

export const pdfRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

pdfRouter.use(authMiddleware);

pdfRouter.post(
  "/upload",
  upload.single("pdf"),
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      const userId = req.user!.userId;
      const { s3Key, s3Url } = await uploadPdfToS3(req.file.buffer, userId, req.file.originalname);

      const [pdfRecord] = await db.insert(pdfs).values({
        userId,
        filename: req.file.originalname,
        s3Url,
        s3Key,
        status: "processing",
      }).returning();

      await enqueuePdfJob({
        pdfId: pdfRecord.id,
        s3Key,
        userId,
      });

      console.log(`[Server] PDF ${pdfRecord.id} uploaded and job enqueued to SQS.`);

      return res.status(200).json({
        pdfId: pdfRecord.id,
        status: "processing",
        message: "File uploaded, processing started",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

pdfRouter.get("/", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.userId;
    const userPdfs = await db.select().from(pdfs).where(eq(pdfs.userId, userId)).orderBy(desc(pdfs.createdAt));
    return res.status(200).json(userPdfs);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

pdfRouter.get("/:id/status", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.userId;
    const pdfId = req.params.id;

    const [pdf] = await db.select().from(pdfs).where(eq(pdfs.id, pdfId));
    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    if (pdf.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    return res.status(200).json({
      pdfId: pdf.id,
      status: pdf.status,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
