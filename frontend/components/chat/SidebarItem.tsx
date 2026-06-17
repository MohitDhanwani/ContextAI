import { FileText } from "lucide-react";
import { ChatSession } from "@/types";

interface SidebarItemProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarItem({ session, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[40px] rounded-[6px] px-2.5 flex items-center gap-2 transition-colors duration-150 ${
        isActive
          ? "bg-elevated text-primary"
          : "bg-transparent text-secondary hover:bg-[#161616]"
      }`}
    >
      <FileText size={14} className="text-muted shrink-0" />
      <span className="truncate text-[13px] font-body text-left">
        {session.pdfFilename}
      </span>
    </button>
  );
}
