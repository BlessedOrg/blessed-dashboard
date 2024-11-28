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
import { FormField } from "@/components/common/FormFields";
import { uploadBrowserFilesToS3 } from "@/utils/uploadImagesToS3";

interface EditableNameFieldProps {
  isEditing: boolean;
  currentValue: string;
  editedValue: string;
  onEdit: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  toggleEdit: () => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

interface EditableDescriptionFieldProps {
  currentValue: string;
  editedValue: string;
  onEdit: (value: string) => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
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
  placeholder,
  errorMessage,
  isInvalid
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
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-semibold">{currentValue || placeholder}</span>
            <Button variant="ghost" size="icon" onClick={toggleEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          {isInvalid && <p className="text-red-500 font-semibold">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

const EditableDescriptionField = ({ currentValue, editedValue, onEdit, placeholder, isInvalid, errorMessage }: EditableDescriptionFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={editedValue || currentValue}
        onChange={(e) => {
          onEdit(e.target.value);
        }}
        placeholder={placeholder}
        className={"bg-transparent border-2 px-4 rounded-xl"}
      />
      {isInvalid && <p className="text-red-500 font-semibold">{errorMessage}</p>}
    </div>
  );
};

export const NameAndDescriptionCard = ({ form, defaultValues, className, eventId, appId, withSave = false }: NameAndDescriptionTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const router = useRouter();
  const { watch, setValue, handleSubmit, formState: { errors } } = form;

  const currentName = watch("name");
  const currentDescription = watch("description");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let uploadedLogo: string | null = defaultValues?.logo || null;
      if (data.logo instanceof File) {
        const uploadedFile = await uploadBrowserFilesToS3([data.logo]);
        console.log(uploadedFile);
        uploadedLogo = uploadedFile?.[0]?.uploadedFileUrl;
      }
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
            <FormField label="Event name" register={form.register} id="name" isInvalid={!!errors?.name} errorMessage={errors?.name?.message} placeholder="Enter event name" />

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Description</h3>
              <EditableDescriptionField
                currentValue={currentDescription}
                editedValue={currentDescription}
                onEdit={(value) => setValue("description", value)}
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="h-full w-[40%] relative">
            <ImageUploader setValue={setValue} defaultValue={defaultValues?.logo} />
          </div>
        </div>

        {withSave && <Button type="submit" variant="green" className="w-fit" isLoading={isSubmitting}>
          Save Changes
        </Button>}
      </form>
    </Card>
  );
};