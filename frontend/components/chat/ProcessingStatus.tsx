export function ProcessingStatus({ status, onRetry }: { status: "processing" | "failed", onRetry: () => void }) {
  if (status === "failed") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-base text-center">
        <div className="text-error font-body font-medium text-[15px] mb-2">
          Processing failed
        </div>
        <div className="text-muted font-body font-light text-[13px] mb-6">
          Try uploading the PDF again.
        </div>
        <button
          onClick={onRetry}
          className="h-[34px] rounded-[6px] border border-border bg-transparent text-secondary text-[12px] font-body px-6 hover:border-[#3a3a3a] hover:text-primary transition-colors duration-150"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 h-full bg-base text-center">
      <div className="w-[10px] h-[10px] rounded-full bg-accent animate-[pulse-opacity_1.5s_infinite] mb-6" />
      <div className="text-secondary font-body font-normal text-[15px] mb-2">
        Processing your PDF...
      </div>
      <div className="text-muted font-body font-light text-[13px]">
        This takes about 15 seconds
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-opacity {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}} />
    </div>
  );
}
