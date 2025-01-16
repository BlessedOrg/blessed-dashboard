import { Card } from "@/components/ui";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Label } from "@/components/ui/label";

export const LogoCard = ({ form }: { form: any }) => {
  return (
    <Card className='p-6'>
      <div className="flex items-center gap-4 min-h-[100px]">
        <Label>Upload an image or logo representing the discount.</Label>
        <div className='w-full'>
				<ImageUploader setValue={form.setValue} name="logoUrl" defaultValue="/img/icons/discount.svg" />
				</div>
      </div>
    </Card>
  );
};
