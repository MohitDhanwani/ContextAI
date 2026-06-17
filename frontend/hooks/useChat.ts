import { useState, useCallback, useEffect } from "react";
import { Message, ChatSession } from "@/types";
import { api } from "@/lib/api";

export function useChat(activeSession: ChatSession | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!activeSession) {
      setMessages([]);
      return;
    }

    let isMounted = true;
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const data = await api.session.getMessages(activeSession.id);
        if (isMounted) setMessages(data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMessages();
    return () => {
      isMounted = false;
    };
  }, [activeSession]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeSession || !content.trim()) return;

      const tempUserMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, tempUserMessage]);
      setIsSending(true);

      try {
        const res = await api.session.sendMessage(activeSession.id, content);
        setMessages((prev) =>
          prev.map((m) => (m.id === tempUserMessage.id ? res.userMessage : m)).concat(res.assistantMessage)
        );
      } catch (err) {
        console.error("Failed to send message", err);
      } finally {
        setIsSending(false);
      }
    },
    [activeSession]
  );

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
  };
}
