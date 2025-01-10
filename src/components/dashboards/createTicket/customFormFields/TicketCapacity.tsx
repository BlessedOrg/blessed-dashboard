import { Card, Label } from "@/components/ui";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export const TicketCapacity = ({ form }: { form: any }) => {
  const { register, watch, setValue } = form;
  
  const initialSupply = watch("initialSupply");
  const maxSupply = watch("maxSupply");

  useEffect(() => {
    if (initialSupply > maxSupply) {
      setValue("maxSupply", initialSupply);
    }
  }, [initialSupply, maxSupply, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacity</CardTitle>
        <CardDescription>Define the maximum number of tickets available for your event</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className='space-y-2'>
            <Label htmlFor='initialSupply'>Initial Capacity</Label>
            <Input 
              id='initialSupply' 
              type='number'
              min={1}
              {...register('initialSupply')}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='maxSupply'>Maximum Capacity</Label>
            <Input 
              id='maxSupply' 
              type='number'
              min={1}
              {...register('maxSupply')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
