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
    // Attempt to decode email from JWT token in local storage if possible, otherwise keep dummy
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
    <div className="w-[260px] bg-surface border-r border-border flex flex-col h-screen shrink-0">
      <div className="p-[20px_16px] font-display text-[16px] text-primary">
        PDFChat
      </div>
      
      <div className="px-4 mb-2">
        <button
          onClick={onNewChat}
          className="w-full h-[34px] rounded-[6px] border border-border bg-transparent text-secondary text-[12px] font-body hover:border-[#3a3a3a] hover:text-primary transition-colors duration-150"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1 custom-scrollbar">
        {sessions.map((session) => (
          <SidebarItem
            key={session.id}
            session={session}
            isActive={activeSessionId === session.id}
            onClick={() => onSelectSession(session.id)}
          />
        ))}
      </div>

      <div className="p-[12px_16px] border-t border-border flex justify-between items-center text-[12px] shrink-0 mt-auto">
        <span className="text-muted truncate mr-2">{email}</span>
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
