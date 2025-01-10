import { Card, Input, Label, Select } from "@/components/ui";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";

export const TicketPrice = ({ form, appId }) => {
  const {
    register,
    formState: { errors },
    control,
  } = form;
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6 flex flex-col gap-4">
        <h2 className="text-lg font-medium mb-4">Define the price of your ticket</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 100"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="currency">Currency</Label>
            <Controller
              render={({ field }) => (
                <Select disabled={false} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              )}
              name="currency"
              control={control}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
