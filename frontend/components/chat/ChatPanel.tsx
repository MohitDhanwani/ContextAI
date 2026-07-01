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
    <div className="flex-1 flex flex-col h-screen bg-canvas relative">
      <div className="h-[60px] shrink-0 border-b border-border flex items-center px-6 gap-2 bg-canvas z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <span className="text-[14px] text-primary font-medium truncate max-w-[300px]">
          {session.pdfFilename}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
        <div className="max-w-[800px] mx-auto w-full pb-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-5 h-5 border-2 border-border border-t-primary rounded-[2px] animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              
              {/* Static Highlight Trace Motif */}
              <div className="mb-6 p-3 bg-surface border border-border flex flex-col gap-2 w-[180px] shadow-sm">
                <div className="w-3/4 h-1.5 bg-border/50 rounded-sm"></div>
                <div className="w-full h-1.5 bg-border/50 rounded-sm"></div>
                <div className="w-full h-1.5 relative rounded-sm overflow-hidden">
                  <div className="absolute inset-0 bg-accent-highlight-dim"></div>
                  <div className="absolute left-0 top-0 bottom-0 bg-accent-highlight w-[60%]"></div>
                </div>
                <div className="w-1/2 h-1.5 bg-border/50 rounded-sm"></div>
              </div>
              
              <h3 className="text-[18px] font-medium text-primary mb-2">
                Chat with {session.pdfFilename}
              </h3>
              <p className="text-[15px] text-muted max-w-[320px]">
                Ask questions to extract insights from this document. Every answer will cite the source text.
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
                    <div className="w-6 h-6 shrink-0 mt-1 bg-accent-highlight flex items-center justify-center text-canvas rounded-[2px] opacity-70">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="flex items-center h-[32px]">
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

      <div className="shrink-0 p-4 md:p-6 bg-gradient-to-t from-canvas via-canvas to-transparent pb-6 md:pb-8">
        <div className="max-w-[800px] mx-auto">
          <ChatInput onSend={sendMessage} disabled={isLoading || isSending} />
          <div className="text-center mt-3">
            <span className="text-[11px] text-muted font-body tracking-wide">
              Every answer is generated from the uploaded context, but verify important details.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
