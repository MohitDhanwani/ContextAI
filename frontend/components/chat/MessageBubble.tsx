"use client";

import { Message } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="max-w-[75%] bg-[#1a1a1a] border border-border rounded-[10px_10px_2px_10px] px-4 py-3">
          <p className="text-[14px] text-primary whitespace-pre-wrap font-body">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="max-w-[100%] flex gap-4 relative w-full">
        <div className="absolute -left-[20px] top-1.5 text-accent text-[12px] opacity-80">◆</div>
        <div className="text-[14px] text-primary font-light leading-[1.7] markdown-body w-full overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
              a: ({ node, ...props }) => <a className="text-accent hover:underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-4" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              h1: ({ node, ...props }) => <h1 className="text-[18px] font-medium mt-6 mb-3" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-[16px] font-medium mt-5 mb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-[15px] font-medium mt-4 mb-2" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold text-primary" {...props} />,
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match && !className;
                
                if (isInline) {
                  return <code className="bg-[#1a1a1a] text-accent px-1.5 py-0.5 rounded-[4px] text-[13px] font-mono" {...props}>{children}</code>;
                }
                
                return (
                  <div className="my-4 rounded-[8px] overflow-hidden border border-border bg-[#0a0a0a]">
                    <div className="flex items-center px-4 py-2 border-b border-border bg-[#111111] text-[12px] text-muted uppercase">
                      {match?.[1] || "code"}
                    </div>
                    <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
