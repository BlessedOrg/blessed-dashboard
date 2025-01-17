import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface RedemptionLocationCardProps {
  form: any;
}

const tabs = [
  {
    name: "Add location via map",
    value: "map",
  },
  {
    name: "URL for online discounts",
    value: "url",
  },
];

export function RedemptionLocationCard({ form }: RedemptionLocationCardProps) {
  const [activeTab, setActiveTab] = useState("map");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Redemption location</h3>
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
        <TabsContent value="map">
          <Button variant="outline" className="w-full" type="button" size="lg">
            <MapPin className="mr-2 h-4 w-4" />
            Search and add via map
          </Button>
        </TabsContent>
        <TabsContent value="url">
          <div className="space-y-2">
            <Label>URL for online discounts (optional)</Label>
            <Input placeholder="www.eventbar2025.de/discount20" {...form.register("locationUrl")} className="flex-1" />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
