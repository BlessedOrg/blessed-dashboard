import { Badge, Button, Card } from "@/components/ui";

export const AudienceDashboardSidebarNav = ({
  currentTabId,
  className,
  audiences,
  onTabChange
}: {
  currentTabId: string;
  className?: string;
  audiences: IAudience[];
  onTabChange: (index: string) => void;
}) => {
  const sortedAudiences = audiences.sort((a, b) => (b.AudienceUsers?.length || 0) - (a.AudienceUsers?.length || 0));
  return (
    <div className={`flex flex-col gap-4 lg:sticky lg:top-[6.25rem] lg:h-[calc(100vh-6.25rem)] lg:min-w-[20.5rem] ${className || ""}`}>
      <Button variant={"yellow"} className="w-full text-black" onClick={() => onTabChange("create")}>
        Add new audience
      </Button>
      {!!sortedAudiences?.length && (
        <Card className="px-0 py-2 max-h-[350px] overflow-y-auto">
          <ul className="overflow-hidden">
            {sortedAudiences.map((audience) => {
              const isActive = audience.id === currentTabId;
              return (
                <li key={audience.id} className={`px-5 py-2 hover:bg-[#FAFAFA] transition-all w-full  ${isActive ? "bg-[#FAFAFA]" : ""}`}>
                  <button
                    onClick={() => onTabChange(audience.id)}
                    className={`flex gap-1 w-full items-center justify-between text-left my-1`}
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{audience.name}</h3>
                      <p className="text-sm">Created at {new Date(audience.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col">
                      <p>{audience?.AudienceUsers?.length || 0} users</p>
                      {!audience?.AudienceUsers?.length && <Badge className="bg-red-300 text-center flex justify-center">Draft</Badge>}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
};
