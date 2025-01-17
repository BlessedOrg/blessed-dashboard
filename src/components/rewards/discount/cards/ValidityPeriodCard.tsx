import { DatePicker } from '@/components/dashboards/eventDashboard/selects/DatePicker';
import { Label } from '@/components/ui';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

interface ValidityPeriodCardProps {
  form: any
}

export function ValidityPeriodCard({ form}: ValidityPeriodCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Validity period</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start</Label>
          <DatePicker
            name="validFrom"
            control={form.control}
            isDisabled={false}
            icon={<Calendar />}
          />
        </div>

        <div className="space-y-2">
          <Label>End</Label>
          <DatePicker
            name="validTo"
            control={form.control}
            isDisabled={false}
            icon={<Calendar />}
          />
        </div>
      </div>
    </Card>
  );
} 