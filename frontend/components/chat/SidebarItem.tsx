import { ChatSession } from "@/types";

interface SidebarItemProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarItem({ session, isActive, onClick }: SidebarItemProps) {
  // Use session.createdAt as a proxy for the demo timestamp
  const time = session.createdAt ? new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "10:24 AM";
  const pages = (session.pdfFilename.length % 40) + 5; // Deterministic mock page count to avoid Math.random during render

  return (
    <button
      onClick={onClick}
      className={`w-full relative px-6 py-3 flex flex-col items-start gap-1 transition-colors duration-150 ${
        isActive
          ? "bg-surface-raised"
          : "bg-transparent hover:bg-surface-raised"
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-highlight" />
      )}
      
      <span className={`truncate w-full text-left text-[14px] font-body ${isActive ? 'text-primary' : 'text-muted'}`}>
        {session.pdfFilename}
      </span>
      
      <div className="flex items-center gap-3 font-mono text-[11px] text-muted tracking-wide">
        <span>{pages} pgs</span>
        <span className="w-[3px] h-[3px] rounded-full bg-border" />
        <span>{time}</span>
      </div>
    </button>
  );
}
