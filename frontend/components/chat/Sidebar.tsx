"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import { ChatSession } from "@/types";
import { api, getAuthToken } from "@/lib/api";
import Cookies from "js-cookie";

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
}

export function Sidebar({ sessions, activeSessionId, onSelectSession, onNewChat }: SidebarProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("user@example.com");

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.email) setEmail(payload.email);
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, []);

  const handleSignOut = () => {
    Cookies.remove("pdfchat_token");
    router.push("/auth/signin");
  };

  return (
    <div className="w-[280px] bg-canvas border-r border-border flex flex-col h-screen shrink-0">
      <div className="p-5 font-display font-medium text-[16px] text-primary flex items-center justify-between">
        <span>PDFChat</span>
      </div>
      
      <div className="px-4 mb-4">
        <button
          onClick={onNewChat}
          className="w-full h-[36px] rounded-[4px] border border-border bg-surface text-primary text-[13px] font-medium hover:border-accent-ink transition-colors duration-150 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Chat
        </button>
      </div>

      <div className="px-4 pb-2 text-[11px] font-mono tracking-widest text-muted uppercase">
        Documents
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
        {sessions.map((session) => (
          <SidebarItem
            key={session.id}
            session={session}
            isActive={activeSessionId === session.id}
            onClick={() => onSelectSession(session.id)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-border flex justify-between items-center text-[13px] shrink-0 mt-auto bg-surface">
        <span className="text-muted truncate mr-2 font-mono text-[11px]">{email}</span>
        <button 
          onClick={handleSignOut}
          className="text-muted hover:text-error transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
