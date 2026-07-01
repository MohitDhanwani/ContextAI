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
            className="bg-surface border border-border rounded-[4px] p-8 w-full max-w-[440px] shadow-xl"
          >
            <h2 className="font-display font-medium text-[18px] text-primary mb-1">
              Upload a PDF
            </h2>
            <p className="font-body text-[14px] text-muted mb-6">
              Start a new chat session from a PDF document.
            </p>

            <div
              className={`border rounded-[4px] p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 ${
                isDragging ? "border-dashed border-accent-ink bg-surface-raised" : "border-dashed border-border hover:border-accent-ink"
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
                <div className="flex flex-col items-center font-body">
                  <span className="text-primary text-[14px] font-medium">{file.name}</span>
                  <span className="text-muted text-[12px] mt-1 font-mono tracking-wide">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ) : (
                <div className="font-body">
                  <span className="text-primary text-[14px] block">Drop your PDF here</span>
                  <span className="text-muted text-[13px] mt-1 block">or click to browse</span>
                </div>
              )}
            </div>

            {error && <div className="text-error text-[13px] mt-3 font-body">{error}</div>}

            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full bg-accent-highlight text-canvas font-medium h-[42px] rounded-[4px] flex items-center justify-center transition-all duration-200 hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed font-body"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-canvas/30 border-t-canvas rounded-full animate-spin" />
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
                className="text-muted text-[13px] hover:text-primary transition-colors font-body"
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
