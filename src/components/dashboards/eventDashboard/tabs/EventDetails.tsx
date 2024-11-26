import { EventPreviewCard } from "@/components/cards/EventPreviewCard";
import { Button, Card } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardContent } from "@/components/ui/card";

export const EventDetails = ({ eventData }) => {
  const pathname = usePathname();
  return <Card className="w-full" variant="rounded">
    <CardContent className="flex gap-2 flex-col ">
      <EventPreviewCard eventData={eventData} />
      <Button asChild variant="green" className="self-center">
        <Link href={`${pathname}/edit`}>Edit details</Link>
      </Button>
    </CardContent>
  </Card>;
};