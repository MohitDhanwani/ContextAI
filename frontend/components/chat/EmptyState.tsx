export function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-base">
      <div className="font-display text-[28px] text-primary mb-2">
        PDFChat
      </div>
      <div className="font-body font-light text-[15px] text-secondary mb-8">
        Upload a PDF to get started.
      </div>
      <button
        onClick={onUpload}
        className="h-[34px] rounded-[6px] border border-border bg-transparent text-secondary text-[12px] font-body px-6 hover:border-[#3a3a3a] hover:text-primary transition-colors duration-150"
      >
        Upload PDF
      </button>
    </div>
  );
}
