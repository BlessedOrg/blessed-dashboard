"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { resizeImageIfNeeded } from "@/utils/resizeImageIfNeeded";
import { ImageCropModal } from "@/components/ui/image-crop-modal";
import { uploadBrowserFilesToS3 } from "@/utils/uploadImagesToS3";
import { useUserContext } from "@/store/UserContext";
import { fetcherWithToken } from "@/requests/requests";
import { apiUrl } from "@/variables/variables";
import { base64ToFile } from "@/utils/files";
import { PersonIcon } from "@radix-ui/react-icons";

export function ProfileAvatar() {
  const { avatarUrl: currentImageUrl, mutate } = useUserContext();

  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = async (fileImage: File) => {
    if (!fileImage.type.startsWith("image/")) {
      console.error("Invalid file type");
      alert("Invalid file type. Please upload an image file.");
      return;
    }

    const maxMb = 5;
    const maxFileSize = maxMb * 1024 * 1024;
    if (fileImage.size > maxFileSize) {
      console.error("File size exceeds the limit of 5 MB.");
      alert("File size exceeds the limit of 5 MB.");
      return;
    }

    const resizedBlob = await resizeImageIfNeeded(fileImage, 500 * 1024);
    const file = new File([resizedBlob], fileImage.name, { type: resizedBlob.type });

    try {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setSelectedImage(result);
          setShowCropModal(true);
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

  const handleCropComplete = async (croppedImage: string) => {
    const logoFile = base64ToFile(croppedImage, uploadedFile.name);
    setIsUploading(true);
    try {
      const uploadedFile = await uploadBrowserFilesToS3([logoFile]);
      if (uploadedFile?.[0]?.uploadedFileUrl) {
        await fetcherWithToken(`${apiUrl}/private/developers/avatar`, {
          method: "POST",
          body: JSON.stringify({
            avatarUrl: uploadedFile[0].uploadedFileUrl
          })
        });
        await mutate();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsUploading(false);
      setSelectedImage(null);
    }

  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="relative">
      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
        {currentImageUrl ? (
          <Image
            src={currentImageUrl}
            alt="Profile"
            width={200}
            height={200}
            priority={true}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <PersonIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatar-upload"
        onChange={handleFileSelect}
      />

      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 cursor-pointer hover:bg-blue-600 transition-colors"
      >
        <Camera className="w-4 h-4 text-white" />
      </label>

      <ImageCropModal
        aspectRatio={1}
        isOpen={showCropModal}
        onClose={() => setShowCropModal(false)}
        imageUrl={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
}