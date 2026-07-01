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
        <div className="max-w-[80%] bg-surface-raised border border-border p-4 shadow-sm">
          <p className="text-[15px] text-primary whitespace-pre-wrap font-body leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="max-w-[100%] flex gap-4 w-full">
        <div className="w-6 h-6 shrink-0 mt-1 bg-accent-highlight flex items-center justify-center text-canvas rounded-[2px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div className="text-[15px] text-primary font-body leading-[1.7] w-full overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
              a: ({ node, children, href, ...props }) => (
                <span className="relative">
                  <span className="bg-accent-highlight-dim text-primary px-1">{children}</span>
                  <a href={href} className="inline-flex items-center justify-center ml-1 bg-accent-highlight text-canvas font-mono text-[11px] px-1.5 py-0.5 rounded-[2px] hover:brightness-90 transition-all" target="_blank" rel="noopener noreferrer" {...props}>
                    {href?.replace("https://", "").replace("http://", "").split("/")[0] || "cite"}
                  </a>
                </span>
              ),
              ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-4 text-muted" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-4 text-muted" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              h1: ({ node, ...props }) => <h1 className="text-[18px] font-medium mt-6 mb-3 text-primary" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-[16px] font-medium mt-5 mb-2 text-primary" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-[15px] font-medium mt-4 mb-2 text-primary" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-medium text-primary" {...props} />,
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match && !className;
                
                if (isInline) {
                  return <code className="bg-surface border border-border text-primary px-1.5 py-0.5 text-[13px] font-mono" {...props}>{children}</code>;
                }
                
                return (
                  <div className="my-4 overflow-hidden border border-border bg-canvas">
                    <div className="flex items-center px-4 py-2 border-b border-border bg-surface text-[12px] text-muted uppercase font-mono">
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
