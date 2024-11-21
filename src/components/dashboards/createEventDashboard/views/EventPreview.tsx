import { FieldValues, UseFormReturn } from "react-hook-form";
import { EventPreviewCard } from "@/components/cards/EventPreviewCard";
import { Button, Card } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/app/api/events";
import { useState } from "react";
import { toast } from "react-toastify";

export const EventPreview = ({ form, appId, eventId }: { form: UseFormReturn<FieldValues, any, undefined>, appId: string, eventId: string }) => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const values = form.watch() as IEventDetails;
  const pathname = usePathname();
  const isEditView = pathname?.includes("/edit");
  const router = useRouter();
  const onEventPublish = async () => {
    setSendingRequest(true);
    try {
      const payload = {
        ...values,
        logoUrl: values?.logoUrl.includes("https://") ? values.logoUrl : null
      };
      const res = await createEvent(appId, payload);
      if (res?.slug) {
        toast("Event created successfully!", { type: "success" });
        router.push(`/${appId}/${res.slug}`);
      }
    } catch (e) {
      toast(e?.message || "Something went wrong!", { type: "error" });
      console.log(e);
    }
    setSendingRequest(false);
  };

  const onEventUpdate = async () => {
    setSendingRequest(true);
    try {
      const payload = {
        ...values,
        logoUrl: values?.logoUrl.includes("https://") ? values.logoUrl : null
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
    setSendingRequest(false);
  };
  return <Card className="p-0 flex flex-col gap-2 w-full pb-6">
    <EventPreviewCard eventData={values} />
    <Button variant="green" className="self-center" isLoading={sendingRequest} onClick={isEditView ? onEventUpdate : onEventPublish}>{isEditView ? "Update" : "Publish"} Event</Button>
  </Card>;
};