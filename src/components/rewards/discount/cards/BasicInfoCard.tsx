import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';

interface BasicInfoCardProps {
  form: any;
}

export function BasicInfoCard({ form }: BasicInfoCardProps) {
  const MAX_NAME_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 300;
	
	const [nameLength, setNameLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);

	const watchName = form.watch("name");
  const watchDescription = form.watch("description");

  useEffect(() => {
    setNameLength(watchName?.length || 0);
  }, [watchName]);

  useEffect(() => {
    setDescriptionLength(watchDescription?.length || 0);
  }, [watchDescription]);
	
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Reward name</Label>
          <div className="relative">
            <Input 
              placeholder="Percentage Discount"
              maxLength={MAX_NAME_LENGTH}
              {...form.register("name")}
              className={cn(
                nameLength >= MAX_NAME_LENGTH && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            <div className={cn(
              "text-xs mt-1",
              nameLength >= MAX_NAME_LENGTH ? "text-red-500" : "text-gray-500"
            )}>
              {nameLength}/{MAX_NAME_LENGTH}
            </div>
          </div>
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <div className="relative">
            <Input 
              placeholder="Enjoy 20% off on all purchases this summer! Valid online and in-store."
              maxLength={MAX_DESCRIPTION_LENGTH}
              {...form.register("description")}
              className={cn(
                descriptionLength >= MAX_DESCRIPTION_LENGTH && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            <div className={cn(
              "text-xs mt-1",
              descriptionLength >= MAX_DESCRIPTION_LENGTH ? "text-red-500" : "text-gray-500"
            )}>
              {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
            </div>
          </div>
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
} 