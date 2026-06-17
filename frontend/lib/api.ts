import { AuthResponse, ChatSession, Message, PDF, PDFStatus, SendMessageResponse } from "../types";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const authToken = token || Cookies.get("pdfchat_token") || null;
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }

  return res.json();
}

export function getAuthToken(): string | null {
  return Cookies.get("pdfchat_token") || null;
}

export const api = {
  auth: {
    signup: (data: { username: string; email: string; password: string }) =>
      request<AuthResponse>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    signin: (data: { email: string; password: string }) =>
      request<AuthResponse>("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  pdf: {
    upload: (file: File, token: string) => {
      const formData = new FormData();
      formData.append("pdf", file);
      return fetch(`${BASE_URL}/api/pdf/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: "Upload failed" }));
            throw new Error(err.error || "Upload failed");
        }
        return res.json();
      });
    },

    list: () => request<PDF[]>("/api/pdf"),

    getStatus: (pdfId: string) =>
      request<PDFStatus>(`/api/pdf/${pdfId}/status`),
  },

  session: {
    create: (pdfId: string) =>
      request<ChatSession>("/api/session", {
        method: "POST",
        body: JSON.stringify({ pdfId }),
      }),

    list: () => request<ChatSession[]>("/api/session"),

    getMessages: (sessionId: string) =>
      request<Message[]>(`/api/session/${sessionId}/messages`),

    sendMessage: (sessionId: string, content: string) =>
      request<SendMessageResponse>(`/api/session/${sessionId}/message`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
  },
};
