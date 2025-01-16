import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetcherWithToken } from "@/requests/requests";
import { uploadBrowserFilesToS3 } from "@/utils/uploadImagesToS3";
import { apiUrl } from "@/variables/variables";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const PreviewVoucherCard = ({ form, appId }: { form: any; appId: string }) => {
  const values = form.watch() as Discount;
	const router = useRouter()
  const onPublish = form.handleSubmit(async (data: any) => {
    console.log("VALUES", values);
			const { logoFile } = values as any;

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
        logoUrl: imageUrl,
      };
      console.log("PAYLOAD", payload);

      const res = await fetcherWithToken(`${apiUrl}/private/apps/${appId}/discounts`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log(res);

			if(res?.id){
				toast("Voucher created successfully!", { type: "success" });
				router.push(`/${appId}/rewards`)
			}
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  console.log("ERRORS", form.formState.errors);
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <img src={values.logoUrl} alt="Reward logo" className="w-16 h-16 object-contain" />
        <div className="flex flex-col gap-1 flex-1">
          <div>
            <h3 className="text-lg font-medium">{values.name}</h3>
            <p className="text-sm text-gray-500">{values.description}</p>
          </div>
          <div className="flex gap-4 mt-1 text-sm text-gray-500">
            <div>
              <span className="font-medium">Valid: </span>
              {values.validFrom.toLocaleDateString()} - {values.validTo.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-5">
        <Button variant="green" onClick={onPublish}>
          Publish
        </Button>
      </div>
    </Card>
  );
};
