"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [content]);

  const handleSend = () => {
    if (content.trim() && !disabled) {
      onSend(content.trim());
      setContent("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full max-w-[760px] mx-auto bg-surface border border-border rounded-[4px] flex items-end p-2 pb-2 focus-within:border-accent-ink focus-within:ring-1 focus-within:ring-accent-ink transition-all duration-200">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your PDF..."
        disabled={disabled}
        rows={1}
        className="w-full bg-transparent text-primary text-[15px] px-3 py-2 outline-none resize-none disabled:opacity-50 font-body placeholder:text-muted max-h-[200px] custom-scrollbar"
      />
      
      <button
        onClick={handleSend}
        disabled={!content.trim() || disabled}
        className={`w-[36px] h-[36px] shrink-0 rounded-[4px] flex items-center justify-center transition-colors ml-2 ${
          content.trim() && !disabled
            ? "bg-accent-highlight text-canvas hover:brightness-90"
            : "bg-surface-raised border border-border text-muted cursor-not-allowed"
        }`}
      >
        <ArrowUp size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
