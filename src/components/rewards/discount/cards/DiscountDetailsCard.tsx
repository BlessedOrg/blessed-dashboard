import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DiscountDetailsCardProps {
  form: any;
}

export function DiscountDetailsCard({ form }: DiscountDetailsCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Discount details</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Discount value %</Label>
          <Input 
            type="number"
            placeholder="20"
            {...form.register("percentage", { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <Label>Minimum order value (optional)</Label>
          <Input 
            type="number"
            placeholder="3"
            {...form.register("minOrderValue", { valueAsNumber: true })}
          />
        </div>
      </div>
    </Card>
  );
} 