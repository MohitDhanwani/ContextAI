import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const signinTypeEnum = pgEnum("signin_type", ["email", "google"]);

export const users = pgTable("users", {
  id:         uuid("id").defaultRandom().primaryKey(),
  username:   text("username").notNull(),
  email:      text("email").notNull().unique(),
  password:   text("password"),
  signinType: signinTypeEnum("signin_type").notNull().default("email"),
  createdAt:  timestamp("created_at").defaultNow(),
});

export const pdfs = pgTable("pdfs", {
  id:        uuid("id").defaultRandom().primaryKey(),
  userId:    uuid("user_id").notNull().references(() => users.id),
  filename:  text("filename").notNull(),
  s3Url:     text("s3_url").notNull(),
  s3Key:     text("s3_key").notNull(),
  status:    text("status").notNull().default("processing"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id:        uuid("id").defaultRandom().primaryKey(),
  userId:    uuid("user_id").notNull().references(() => users.id),
  pdfId:     uuid("pdf_id").notNull().references(() => pdfs.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id:        uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id").notNull().references(() => chatSessions.id),
  role:      text("role").notNull(),
  content:   text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
