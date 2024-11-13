import { Card } from "../../ui/card";

export const Campaigns = ({ appId }) => {

  return (
    <div className="w-full flex-col flex gap-4">
      <Card className="flex flex-col gap-4 w-full h-fit">
        <h2 className="font-semibold text-xl">Campaigns</h2>
      </Card>
    </div>
  );
};
