import { EventPreviewCard } from "@/components/cards/EventPreviewCard";
import { Button, Card } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const EventDetails = ({ eventData }) => {
  const pathname = usePathname();
  return <Card className="flex gap-2 flex-col w-full">
    <EventPreviewCard eventData={eventData} />
    <Button asChild variant="green" className="self-center">
      <Link href={`${pathname}/edit`}>Edit details</Link>
    </Button>
  </Card>;
};