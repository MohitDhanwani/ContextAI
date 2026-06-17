import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { rateLimitMiddleware, authRateLimiter } from "../middleware/rateLimit";
import z from "zod";

export const authRouter = Router();

const signupSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post(
  "/signup",
  rateLimitMiddleware(authRateLimiter, (req) => req.ip || "unknown"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, email, password } = signupSchema.parse(req.body);

      const existingUser = await db.select().from(users).where(eq(users.email, email));
      if (existingUser.length > 0) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [newUser] = await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
        signinType: "email",
      }).returning();

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, signinType: newUser.signinType },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return res.status(201).json({
        token,
        user: { id: newUser.id, username: newUser.username, email: newUser.email },
      });
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

authRouter.post(
  "/signin",
  rateLimitMiddleware(authRateLimiter, (req) => req.ip || "unknown"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = signinSchema.parse(req.body);

      const [user] = await db.select().from(users).where(eq(users.email, email));
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!user.password) {
        return res.status(401).json({ error: "Invalid account type. Password not set." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, signinType: user.signinType },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (err: any) {
      console.error("Signin error:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


