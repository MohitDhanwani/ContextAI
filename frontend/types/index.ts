export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type PDF = {
  id: string;
  filename: string;
  s3Url: string;
  status: "processing" | "ready" | "failed";
  createdAt: string;
};

export type PDFStatus = {
  pdfId: string;
  status: "processing" | "ready" | "failed";
};

export type ChatSession = {
  id: string;
  pdfId: string;
  pdfFilename: string;
  createdAt: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type SendMessageResponse = {
  userMessage: Message;
  assistantMessage: Message;
};
