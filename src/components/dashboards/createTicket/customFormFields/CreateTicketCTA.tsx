import { createTicket } from "@/app/api/events";
import { TicketPreview } from "@/components/modals/tickets/TicketPreview";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { fileToBase64, getBase64FromUrl } from "@/utils/files";
import { apiUrl } from '@/variables/variables';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from 'swr';

export const CreateTicketCTA = ({ form, isProcessing, toggleProcessingState, appId, eventId }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const router = useRouter();
  const errorsExist = !!Object.keys(errors).length;

  const onSubmit = handleSubmit(async () => {
		const data = form.getValues();
    const { logoFile, imageUrl, ...rest } = data;
    let uploadedImage = null;
    if (logoFile instanceof File) {
      const base64Image = await fileToBase64(logoFile);
      uploadedImage = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
    }
    if (!!imageUrl) {
      uploadedImage = await getBase64FromUrl(imageUrl);
    }
    toggleProcessingState(true);
    try {
      const res = await createTicket(appId, eventId, { ...rest, imageUrl: uploadedImage, transferable: true, whitelistOnly: false });
      if (res?.success) {
        toast("Successfully created ticket!", { type: "success" });
				await mutate(`${apiUrl}/api/v1/private/tickets/${appId}/${eventId}`)
        router.push(`/${appId}/${eventId}/tickets`);
      } else {
        toast(res?.message || "Something went wrong!", { type: "error" });
      }
    } catch (e) {
      console.log(e);
      toast(e?.message || "Something went wrong!", { type: "error" });
    }
    toggleProcessingState(false);
  });
  return (
    <Card className="flex flex-col gap-4 pb-4">
      <TicketPreview form={form} />
      <Button
        variant="green"
        type="submit"
        className="mx-4 self-center my-4"
        onClick={onSubmit}
        isLoading={isProcessing}
        disabled={errorsExist || isProcessing}
      >
        Publish Ticket
      </Button>
    </Card>
  );
};
