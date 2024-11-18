"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Check, Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateEvent } from "@/app/api/events";
import { useRouter } from "next/navigation";

interface EditableNameFieldProps {
  isEditing: boolean;
  currentValue: string;
  editedValue: string;
  onEdit: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  toggleEdit: () => void;
  placeholder?: string;
}

interface EditableDescriptionFieldProps {
  currentValue: string;
  editedValue: string;
  onEdit: (value: string) => void;
  placeholder?: string;
}
interface FormData {
  name: string;
  description: string;
  logo?: File;
}

interface AppData {
  name?: string;
  description?: string;
  logo?: string;
}

interface NameAndDescriptionTabProps {
  defaultValues?: AppData;
  className?: string;
  appId: string;
  eventId: string;
}

const EditableNameField = ({
  isEditing,
  currentValue,
  editedValue,
  onEdit,
  onSave,
  onCancel,
  toggleEdit,
  placeholder,
}: EditableNameFieldProps) => {
  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <Input
            value={editedValue || currentValue}
            onChange={(e) => onEdit(e.target.value)}
            placeholder={placeholder}
            className={"bg-transparent"}
          />
          <Button variant="ghost" size="icon" onClick={onSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <span className="font-semibold">{currentValue || placeholder}</span>
          <Button variant="ghost" size="icon" onClick={toggleEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

const EditableDescriptionField = ({ currentValue, editedValue, onEdit, placeholder }: EditableDescriptionFieldProps) => {
  return (
    <div className="flex items-center gap-2">
      <Textarea
        value={editedValue || currentValue}
        onChange={(e) => {
          onEdit(e.target.value);
        }}
        placeholder={placeholder}
        className={"bg-transparent border-2 px-4 rounded-xl"}
      />
    </div>
  );
};

export const NameAndDescriptionTab = ({ defaultValues, className, eventId, appId }: NameAndDescriptionTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(defaultValues?.logo || "/img/upload.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { watch, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    },
  });

  const currentName = watch("name");
  const currentDescription = watch("description");

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type");
      return;
    }

    try {
      setValue("logo", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let uploadedLogo: string | null = defaultValues?.logo || null;
      // if (data.logo instanceof File) {
      //   const uploadedFile = await uploadBrowserFilesToS3([data.logo]);
      //   uploadedLogo = uploadedFile?.[0]?.uploadedFileUrl;
      // }
      const payload = {
        name: data.name,
        description: data.description,
        logoUrl: uploadedLogo,
        appId,
        eventId,
      };
      const res = await updateEvent(payload);
      if (!!res?.slug) {
        toast("Updated successfully", { type: "success" });
        if (res.slug !== eventId) {
          router.push(`/${appId}/${res.slug}`);
        }
      }
    } catch (e) {
      toast(e?.message || "Something went wrong", { type: "error" });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className={`p-6 ${className} w-full`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <EditableNameField
                isEditing={isEditingName}
                currentValue={currentName}
                editedValue={currentName}
                onEdit={(value) => setValue("name", value)}
                onSave={() => setIsEditingName(false)}
                onCancel={() => setIsEditingName(false)}
                toggleEdit={() => setIsEditingName(true)}
                placeholder="Enter name"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-md">Description</h3>
              <EditableDescriptionField
                currentValue={currentDescription}
                editedValue={currentDescription}
                onEdit={(value) => setValue("description", value)}
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
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
                    className="object-cover rounded-lg"
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
          </div>
        </div>

        <Button type="submit" variant="green" className="w-fit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Card>
  );
};
