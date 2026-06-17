"use client";

import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { ChatSession } from "@/types";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

interface ChatPanelProps {
  session: ChatSession;
}

export function ChatPanel({ session }: ChatPanelProps) {
  const { messages, isLoading, isSending, sendMessage } = useChat(session);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen bg-base relative">
      <div className="h-[56px] shrink-0 border-b border-border flex items-center px-6 gap-2 bg-base z-10">
        <FileText size={14} className="text-muted" />
        <span className="text-[14px] text-primary font-medium truncate max-w-[300px]">
          {session.pdfFilename}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
        <div className="max-w-[800px] mx-auto w-full pb-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-5 h-5 border-2 border-border border-t-primary rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center mb-4">
                <FileText size={24} className="text-muted" />
              </div>
              <h3 className="text-[16px] font-medium text-primary mb-1">
                Chat with {session.pdfFilename}
              </h3>
              <p className="text-[14px] text-secondary">
                Ask questions to extract insights from this document.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {isSending && (
                <div className="flex w-full justify-start mb-6">
                  <div className="max-w-[100%] flex gap-4 relative">
                    <div className="absolute -left-[20px] top-1.5 text-accent text-[12px] opacity-80">◆</div>
                    <div className="flex items-center h-[24px]">
                      <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce mx-0.5" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce mx-0.5" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce mx-0.5" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 p-4 md:p-6 bg-gradient-to-t from-base via-base to-transparent pb-6 md:pb-8">
        <div className="max-w-[800px] mx-auto">
          <ChatInput onSend={sendMessage} disabled={isLoading || isSending} />
          <div className="text-center mt-3">
            <span className="text-[11px] text-muted font-light">
              AI can make mistakes. Verify important information with the original document.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
