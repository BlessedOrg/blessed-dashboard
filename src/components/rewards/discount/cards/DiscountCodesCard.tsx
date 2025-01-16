import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

interface DiscountCodesCardProps {
  form: any;
}
const tabs = [
  {
    name: "One code",
    value: "one-code",
  },
  {
    name: "Multiple codes (auto-generated)",
    value: "multiple-codes",
  },
];
export function DiscountCodesCard({ form }: DiscountCodesCardProps) {
  const [activeTab, setActiveTab] = useState("one-code");

  const handleTabChange = (tab: string) => {
		if(tab === "multiple-codes") {
			form.setValue("uniqueDiscountCodes", true)
			form.setValue("reusable", false);
		} else {
			form.setValue("uniqueDiscountCodes", false)
		}
    setActiveTab(tab);
  };

  const handleSingleUseChange = (checked: boolean) => {
    if (checked) {
      form.setValue("reusable", false);
    }
  };

  const handleReusableChange = (checked: boolean) => {
    form.setValue("reusable", checked);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Discount codes</h3>
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="flex flex-col gap-4">
        <TabsList className="p-2 bg-gray-100 rounded-full w-fit flex gap-2">
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn("px-4 py-2 rounded-full font-semibold text-sm", isActive && "bg-white")}
              >
                {tab.name}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="one-code">
          <div className="space-y-2 pb-4">
            <Label>Single code (optional)</Label>
            <Input placeholder="DISCOUNT20" {...form.register("discountCode")} />
            <div className="text-xs text-gray-500">e.g., "WELCOME10"</div>
          </div>
          <div className="flex justify-evenly gap-4 py-4 border-t">
            <div className="flex items-center gap-2">
              <Checkbox onCheckedChange={handleSingleUseChange} checked={!form.watch("reusable")} size="lg" />
              <div className="font-medium">Single-use per user</div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={form.watch("reusable")} onCheckedChange={handleReusableChange} size="lg" />
              <div className="font-medium">Reusable</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="multiple-codes">
          <div className="space-y-2 pb-4">
            <Label>Prefix (optional)</Label>
            <Input placeholder="DISCOUNT20" {...form.register("prefix")} />
            <div className="text-xs text-gray-500">e.g., "WELCOME10"</div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
