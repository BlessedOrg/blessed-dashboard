import Image from "next/image";
import { Card } from "@/components/ui";
import Link from "next/link";

export const EventCard = ({ event, appId }: { event: IEvent; appId: string }) => {
  return (
    <Card className="flex gap-4 items-center relative">
      <Link href={`/${appId}/${event.slug}`} className="w-full h-full absolute top-0" />
      <Image src={event?.logoUrl || "/img/placeholder_image.jpeg"} alt={event.name} width={100} height={100} className="rounded-2xl" />
      <div className="flex gap-1 flex-col">
        <p className="font-semibold text-xl"> {event.name}</p>
        <p>Created at: {new Date(event.createdAt).toLocaleDateString()}</p>
      </div>
    </Card>
  );
};
