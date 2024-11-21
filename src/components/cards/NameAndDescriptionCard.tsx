"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateEvent } from "@/app/api/events";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/image-uploader";

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
  logo?: File | string;
}

interface BaseNameAndDescriptionTabProps {
  className?: string;
  defaultValues?: {
    name: string;
    description: string;
    logo: string;
  };
  form: UseFormReturn<{ name: string, description: string, logo: string }, any, undefined>;
}

interface WithSaveProps extends BaseNameAndDescriptionTabProps {
  withSave: true;
  appId: string;
  eventId: string;
}

interface WithoutSaveProps extends BaseNameAndDescriptionTabProps {
  withSave?: false;
  appId?: string;
  eventId?: string;
}

type NameAndDescriptionTabProps = WithSaveProps | WithoutSaveProps;

const EditableNameField = ({
  isEditing,
  currentValue,
  editedValue,
  onEdit,
  onSave,
  onCancel,
  toggleEdit,
  placeholder
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

export const NameAndDescriptionCard = ({ form, defaultValues, className, eventId, appId, withSave }: NameAndDescriptionTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const router = useRouter();
  const { watch, setValue, handleSubmit } = form;

  const currentName = watch("name");
  const currentDescription = watch("description");

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
        logoUrl: uploadedLogo
      };
      const res = await updateEvent(appId, eventId, payload);
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

          <ImageUploader setValue={setValue} defaultValue={defaultValues?.logo} />
        </div>

        {withSave && <Button type="submit" variant="green" className="w-fit" isLoading={isSubmitting}>
          Save Changes
        </Button>}
      </form>
    </Card>
  );
};