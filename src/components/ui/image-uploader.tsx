"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  setValue: (name: string, value: any) => void;
  defaultValue?: string;
  name?: string;
  className?: string;
}

export const ImageUploader = ({
  setValue,
  defaultValue,
  name = "logoUrl",
  className
}: ImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState<string>(defaultValue || "/img/placeholder_image.jpeg");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type");
      return;
    }

    try {
      setValue("logoFile", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setValue(name, result);
          setPreviewImage(result);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling image upload:", error);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDropdownClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage("");
    setValue(name, "");
    setValue("logoFile", null);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div
        className={cn(
          "relative w-full aspect-video rounded-lg transition-all duration-200",
          "border-2 border-dashed",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          "cursor-pointer group"
        )}
        onClick={handleDropdownClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <>
            <Image
              src={previewImage}
              alt="Upload preview"
              fill
              className="object-cover rounded-lg"
              onError={() => {
                console.error("Error loading image");
                setPreviewImage("");
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-white" />
                <span className="text-white text-sm">Change image</span>
              </div>
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Drop your image here, or{" "}
                <span className="text-blue-500">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {isDragging && (
        <div className="absolute inset-0 bg-blue-500/10 rounded-lg border-2 border-blue-500 pointer-events-none" />
      )}
    </div>
  );
};