import { FieldValues, UseFormReturn } from "react-hook-form";
import { EventPreviewCard } from "@/components/cards/EventPreviewCard";
import { Button, Card } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/app/api/events";
import { toast } from "react-toastify";
import { uploadBrowserFilesToS3 } from "@/utils/uploadImagesToS3";

export const EventPreview = ({ form, appId, eventId, isProcessing, toggleProcessingState }: { form: UseFormReturn<FieldValues, any, undefined>, appId: string, eventId: string, toggleProcessingState: (bool: boolean) => void, isProcessing: boolean }) => {
  const values = form.watch() as IEventDetails;
  const { handleSubmit, formState: { errors } } = form;
  const pathname = usePathname();
  const isEditView = pathname?.includes("/edit");
  const router = useRouter();

  const showErrors = () => {
    const keys: string[] = Object.keys(errors);
    if (keys?.includes("eventLocation")) {
      keys.push(...Object.keys(errors.eventLocation));
    }
    toast(`Fields: ${keys?.map((i: string) => ` ${i.toUpperCase()}`)} - are missing!`, { type: "error" });
  };
  const onEventPublish = async (data) => {
    const { logoFile } = values as any;
    toggleProcessingState(true);

    let imageUrl = values?.logoUrl.includes("https://") ? values.logoUrl : null;
    try {
      if (logoFile instanceof File) {
        const uploadedFile = await uploadBrowserFilesToS3([logoFile]);
        if (uploadedFile?.[0]?.uploadedFileUrl) {
          imageUrl = uploadedFile[0].uploadedFileUrl;
        }
      }
      const payload = {
        ...data,
        logoUrl: imageUrl
      };
      const res = await createEvent(appId, payload);
      if (res?.event?.slug) {
        toast("Event created successfully!", { type: "success" });
        router.push(`/${appId}/${res.event.slug}`);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong!", { type: "error" });
      console.log(e);
    }
    toggleProcessingState(false);
  };

  const onEventUpdate = async (data) => {
    const { logoFile } = values as any;
    toggleProcessingState(true);

    let imageUrl = values?.logoUrl.includes("https://") ? values.logoUrl : null;
    try {
      if (logoFile instanceof File) {
        const uploadedFile = await uploadBrowserFilesToS3([logoFile]);
        if (uploadedFile?.[0]?.uploadedFileUrl) {
          imageUrl = uploadedFile[0].uploadedFileUrl;
        }
      }
      const payload = {
        ...data,
        logoUrl: imageUrl
      };
      const res = await updateEvent(appId, eventId, payload);
      if (res?.slug) {
        toast("Event updated successfully!", { type: "success" });
        router.push(`/${appId}/${res.slug}`);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong!", { type: "error" });
      console.log(e);
    }
    toggleProcessingState(false);
  };

  return <Card className="p-0 flex flex-col gap-2 w-full pb-6">
    <EventPreviewCard eventData={values} />
    <Button variant="green" className="self-center mt-4" isLoading={isProcessing} onClick={!!Object?.keys(errors)?.length ? showErrors : isEditView ? handleSubmit(onEventUpdate) : handleSubmit(onEventPublish)}>{isEditView ? "Update" : "Publish"} Event</Button>
  </Card>;
};