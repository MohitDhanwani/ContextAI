"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/chat/Sidebar";
import { EmptyState } from "@/components/chat/EmptyState";
import { UploadModal } from "@/components/chat/UploadModal";
import { ProcessingStatus } from "@/components/chat/ProcessingStatus";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { api, getAuthToken } from "@/lib/api";
import { ChatSession, PDFStatus } from "@/types";
import { usePolling } from "@/hooks/usePolling";
import Cookies from "js-cookie";

export default function AppIndex() {
  const router = useRouter();
  
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activePdfId, setActivePdfId] = useState<string | null>(null);
  const [pdfStatus, setPdfStatus] = useState<PDFStatus["status"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    if (!getAuthToken()) {
      router.push("/auth/signin");
    }
  }, [router]);

  // Load sessions
  const loadSessions = useCallback(async () => {
    try {
      const data = await api.session.list();
      setSessions(data);
      // Select most recent if none selected
      if (data.length > 0 && !activeSessionId && !activePdfId) {
        setActiveSessionId(data[0].id);
      }
    } catch (err: any) {
      console.error("Failed to load sessions", err);
      if (err.message === "Invalid token" || err.message === "Unauthorized") {
        Cookies.remove("pdfchat_token");
        router.push("/auth/signin");
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId, activePdfId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Polling logic for PDF processing
  const checkStatus = useCallback(async () => {
    if (!activePdfId) return true;
    try {
      const data = await api.pdf.getStatus(activePdfId);
      setPdfStatus(data.status);
      
      if (data.status === "ready") {
        // Create session
        const session = await api.session.create(activePdfId);
        await loadSessions();
        setActiveSessionId(session.id);
        setActivePdfId(null); // Stop polling
        return true; // Stop polling
      }
      
      if (data.status === "failed") {
        return true; // Stop polling
      }
      
      return false; // Continue polling
    } catch (err) {
      console.error("Failed to check status", err);
      return false; // Continue polling (might just be a network blip)
    }
  }, [activePdfId, loadSessions]);

  usePolling(checkStatus, 7000, !!activePdfId && pdfStatus === "processing");

  const handleUploadSuccess = (pdfId: string) => {
    setIsUploadModalOpen(false);
    setActiveSessionId(null);
    setActivePdfId(pdfId);
    setPdfStatus("processing");
  };

  const handleSelectSession = (id: string) => {
    setActivePdfId(null);
    setActiveSessionId(id);
  };

  const handleNewChat = () => {
    setIsUploadModalOpen(true);
  };

  const handleRetryUpload = () => {
    setActivePdfId(null);
    setPdfStatus(null);
    setIsUploadModalOpen(true);
  };

  if (isLoading) {
    return <div className="h-screen w-full bg-base flex items-center justify-center" />;
  }

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base selection:bg-accent selection:text-[#0a0a0a]">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
      />
      
      <main className="flex-1 flex flex-col relative h-full">
        {activePdfId && pdfStatus && pdfStatus !== "ready" ? (
          <ProcessingStatus status={pdfStatus} onRetry={handleRetryUpload} />
        ) : activeSession ? (
          <ChatPanel session={activeSession} />
        ) : (
          <EmptyState onUpload={() => setIsUploadModalOpen(true)} />
        )}
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
