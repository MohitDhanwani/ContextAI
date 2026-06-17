"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, getAuthToken } from "@/lib/api";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (pdfId: string) => void;
}

export function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file.");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Not authenticated");

      const res = await api.pdf.upload(file, token);
      onUploadSuccess(res.pdfId);
      setFile(null); // Reset for next time
    } catch (err: any) {
      setError(err.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-border rounded-[12px] p-[32px] w-full max-w-[440px]"
          >
            <h2 className="font-body font-medium text-[16px] text-primary mb-1">
              Upload a PDF
            </h2>
            <p className="font-body font-light text-[13px] text-secondary mb-6">
              Start a new chat session from a PDF document.
            </p>

            <div
              className={`border rounded-[8px] p-[40px_24px] flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging ? "border-dashed border-[#555555] bg-[#161616]" : "border-dashed border-[#333333] hover:border-[#444444]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              
              {file ? (
                <div className="flex flex-col items-center">
                  <span className="text-primary text-[14px] font-medium">{file.name}</span>
                  <span className="text-muted text-[12px] mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-muted text-[14px]">Drop your PDF here</span>
                  <span className="text-muted text-[13px] mt-1">or click to browse</span>
                </>
              )}
            </div>

            {error && <div className="text-error text-[13px] mt-3">{error}</div>}

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full bg-accent text-[#0a0a0a] font-medium h-[40px] rounded-md flex items-center justify-center transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
              
              <button
                onClick={() => {
                  setFile(null);
                  setError(null);
                  onClose();
                }}
                disabled={isUploading}
                className="text-muted text-[13px] hover:text-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
