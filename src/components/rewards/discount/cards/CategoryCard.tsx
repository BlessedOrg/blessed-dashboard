import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryCardProps {
  form: any
}

const categories = [
  { value: "food", label: "Food & Drinks" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
];

export function CategoryCard({ form }: CategoryCardProps) {
  return (
    <Card className="p-6">
        <div className="space-y-2">
          <Label>Select campaign category</Label>
          <Select onValueChange={(value) => form.setValue("category", value)} defaultValue={form.getValues("category")}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
    </Card>
  );
} 