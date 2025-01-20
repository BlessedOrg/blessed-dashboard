"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const EventCard = ({ event, appId }: { event: IEvent; appId: string }) => {
  const isOngoing = new Date() >= new Date(event.startsAt) && new Date() <= new Date(event.endsAt);
  const isUpcoming = new Date() < new Date(event.startsAt);
  const isPast = new Date() > new Date(event.endsAt);

  const getStatusBadge = () => {
    if (isOngoing) return <Badge className="bg-green-500">Ongoing</Badge>;
    if (isUpcoming) return <Badge className="bg-blue-500">Upcoming</Badge>;
    if (isPast) return <Badge className="bg-gray-500">Past</Badge>;
    return null;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 relative">
      <Link href={`/${appId}/${event.slug}`} className="absolute w-full h-full z-10" />
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image Section */}
            <div className="relative w-full sm:w-48 h-48 shrink-0">
              <Image src={event?.logoUrl || "/img/placeholder_image.jpeg"} alt={event.name} fill className="rounded-xl object-cover" />
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  {getStatusBadge()}
                </div>

                <ExternalLink className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </div>

              {event.description && <p className="text-gray-600 line-clamp-2">{event.description}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.startsAt), "MMM d, yyyy")}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(event.startsAt), "HH:mm")}</span>
                </div>

                {event.EventLocation && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{[event.EventLocation.city, event.EventLocation.country].filter(Boolean).join(", ")}</span>
                  </div>
                )}

                {event.Tickets && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Ticket className="h-4 w-4" />
                    <span>{event.Tickets.length} Ticket types</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
    </Card>
  );
};
