import { ChangeEvent, DragEvent, useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

export const ImageUploader = ({ setValue, defaultValue, name = "logoUrl" }) => {
  const [previewImage, setPreviewImage] = useState<string>(defaultValue || "/img/upload.svg");
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
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  return <div className="flex flex-col gap-2">
    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />

    <div
      className="relative w-40 h-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-all duration-200 ease-in-out"
      onClick={handleDropdownClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {previewImage && (
        <div className="relative w-full h-full">
          <Image
            src={previewImage}
            alt="Upload preview"
            fill
            className="object-contain rounded-lg"
            onError={() => {
              console.error("Error loading image");
              setPreviewImage("/img/upload.svg");
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200">
        <Upload className="h-6 w-6 text-white" />
      </div>
    </div>

    <span className="text-sm text-gray-500">Drag & drop or click to upload</span>
  </div>;
};