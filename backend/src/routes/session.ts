import { Router, Request, Response } from "express";
import { db } from "../db";
import { chatSessions, messages, pdfs } from "../db/schema";
import { eq, and, asc } from "drizzle-orm";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { rateLimitMiddleware, chatRateLimiter } from "../middleware/rateLimit";
import { getRelevantChunks, openaiClient } from "../services/ai";
import z from "zod";

export const sessionRouter = Router();

sessionRouter.use(authMiddleware);

sessionRouter.post(
  "/",
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const { pdfId } = req.body;
      const userId = req.user!.userId;

      if (!pdfId) return res.status(400).json({ error: "pdfId is required" });

      const [pdf] = await db.select().from(pdfs).where(eq(pdfs.id, pdfId));
      if (!pdf) return res.status(404).json({ error: "PDF not found" });
      if (pdf.userId !== userId) return res.status(403).json({ error: "Forbidden" });
      if (pdf.status !== "ready") return res.status(400).json({ error: "PDF is still processing" });

      const existingSessions = await db.select().from(chatSessions).where(
        and(eq(chatSessions.pdfId, pdfId), eq(chatSessions.userId, userId))
      );

      if (existingSessions.length > 0) {
        return res.status(409).json({ error: "Session already exists for this PDF" });
      }

      const [newSession] = await db.insert(chatSessions).values({
        userId,
        pdfId,
      }).returning();

      return res.status(201).json(newSession);
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

sessionRouter.get("/", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.userId;
    
    const sessions = await db
      .select({
        id: chatSessions.id,
        pdfId: chatSessions.pdfId,
        pdfFilename: pdfs.filename,
        createdAt: chatSessions.createdAt,
      })
      .from(chatSessions)
      .innerJoin(pdfs, eq(chatSessions.pdfId, pdfs.id))
      .where(eq(chatSessions.userId, userId));

    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

sessionRouter.get("/:id/messages", async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.userId;
    const sessionId = req.params.id;

    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, sessionId));
    if (!session) return res.status(404).json({ error: "Session not found" });
    if (session.userId !== userId) return res.status(403).json({ error: "Forbidden" });

    const sessionMessages = await db.select().from(messages).where(eq(messages.sessionId, sessionId)).orderBy(asc(messages.createdAt));

    return res.status(200).json(sessionMessages);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const messageSchema = z.object({
  content: z.string().min(1),
});

sessionRouter.post(
  "/:id/message",
  rateLimitMiddleware(chatRateLimiter, (req) => (req as AuthRequest).user!.userId),
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const { content } = messageSchema.parse(req.body);
      const userId = req.user!.userId;
      const sessionId = req.params.id;

      const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, sessionId));
      if (!session) return res.status(404).json({ error: "Session not found" });
      if (session.userId !== userId) return res.status(403).json({ error: "Forbidden" });

      const [userMessage] = await db.insert(messages).values({
        sessionId,
        role: "user",
        content,
      }).returning();

      const relevantChunksStr = await getRelevantChunks(content, session.pdfId);

      const systemPrompt = `You are a helpful AI assistant. Answer the user's question based only on the
provided context from the PDF document. If the answer is not in the context,
say so honestly. Do not make up information.

Context:
${relevantChunksStr}`;

      const aiResponse = await openaiClient.chat.completions.create({
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content },
        ],
      });

      const answer = aiResponse.choices[0].message.content || "Sorry, I could not generate an answer.";

      const [assistantMessage] = await db.insert(messages).values({
        sessionId,
        role: "assistant",
        content: answer,
      }).returning();

      return res.status(200).json({
        userMessage,
        assistantMessage,
      });

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
