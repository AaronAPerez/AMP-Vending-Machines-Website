'use client';

import { useState, useRef, DragEvent } from 'react';
import { UploadIcon, XIcon, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<void>;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  existingImages?: { id: string; url: string; alt: string }[];
  onDelete?: (id: string) => Promise<void>;
  multiple?: boolean;
}

export default function ImageUploader({
  onUpload,
  maxSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  existingImages = [],
  onDelete,
  multiple = false
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      setError(`Invalid file type. Accepted: ${acceptedFormats.join(', ')}`);
      return false;
    }

    // Check file size
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File too large. Maximum size: ${maxSize}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Take first file
    if (!validateFile(file)) return;

    setUploading(true);
    try {
      await onUpload(file);
    } catch (error: any) {
      setError(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDeleteImage = async (id: string) => {
    if (!onDelete) return;

    try {
      await onDelete(id);
    } catch (error: any) {
      setError(error.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-[#FD5A1E] bg-[#FD5A1E]/10'
            : 'border-[#333333] hover:border-[#666666]'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#FD5A1E] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#A5ACAF]">Uploading...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <UploadIcon className="w-12 h-12 mx-auto text-[#A5ACAF]" />
            <div>
              <p className="text-sm font-medium text-[#F5F5F5]">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#A5ACAF] mt-1">
                {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Existing Images Grid */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {existingImages.map((image) => (
            <div
              key={image.id}
              className="relative group bg-[#111111] border border-[#333333] rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {onDelete && (
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XIcon className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-[#A5ACAF] truncate">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
