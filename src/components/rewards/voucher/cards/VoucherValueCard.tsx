import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VoucherValueCardProps {
  form: any;
}

export function VoucherValueCard({ form }: VoucherValueCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Voucher value</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Numeric input or text</Label>
          <Input 
            type="text"
            placeholder="1 Free coffee"
            {...form.register("discountCode")}
          />
        </div>
      </div>
    </Card>
  );
} 