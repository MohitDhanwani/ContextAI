import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

const redisClient = createClient({
  socket: { host: process.env.REDIS_HOST || "localhost", port: Number(process.env.REDIS_PORT || 6379) },
});
redisClient.connect().catch(console.error);

export const authRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl_auth",
  points: 10,     // max requests
  duration: 60,   // per 60 seconds
});

export const chatRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rl_chat",
  points: 10,
  duration: 60,
});

export function rateLimitMiddleware(limiter: RateLimiterRedis, keyFn: (req: Request) => string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await limiter.consume(keyFn(req));
      next();
    } catch {
      res.status(429).json({ error: "Too many requests. Try again in a minute." });
    }
  };
}
