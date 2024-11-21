"use client";

import { CalendarDays, Clock, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTimezones } from "@/hooks/useTimezoneSelect";
import Image from "next/image";

export function EventPreviewCard({ eventData }: { eventData: IEventDetails }) {
  const { currentTimezoneDetails } = useTimezones(eventData?.timezoneIdentifier);

  const formatDate = (date: Date) => {
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64">
          {eventData?.logoUrl && (
            <Image
              width={700}
              height={300}
              src={eventData?.logoUrl}
              alt="Event location"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
            <CardTitle className="text-white text-3xl font-bold mb-2">
              {eventData?.name}
            </CardTitle>
            <CardTitle className="text-white text-xl">
              {eventData?.eventLocation?.city}
              {eventData?.eventLocation?.country && `, ${eventData?.eventLocation?.country}`}
              {eventData?.eventLocation?.countryFlag && (
                <span className="ml-2">{eventData?.eventLocation?.countryFlag}</span>
              )}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {eventData?.description && (
          <p className="text-sm text-muted-foreground mb-6">{eventData?.description}</p>
        )}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {eventData?.startsAt && eventData?.endsAt && (<div className="flex items-center space-x-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p>{formatDate(eventData?.startsAt)}</p>
                <p>{formatDate(eventData?.endsAt)}</p>
              </div>
            </div>)}
            {!!eventData?.timezoneIdentifier && <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">{currentTimezoneDetails?.label || eventData?.timezoneIdentifier}</p>
            </div>}
            {eventData?.eventLocation?.continent && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm">{eventData?.eventLocation?.continent}</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {(eventData?.eventLocation?.street1stLine || eventData?.eventLocation?.postalCode || eventData?.eventLocation?.locationDetails) && (
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  {eventData?.eventLocation?.street1stLine && <p>{eventData?.eventLocation?.street1stLine}</p>}
                  {eventData?.eventLocation?.street2ndLine && <p>{eventData?.eventLocation?.street2ndLine}</p>}
                  {eventData?.eventLocation?.postalCode && <p>{eventData?.eventLocation?.postalCode}</p>}
                  {eventData?.eventLocation?.locationDetails && <p>{eventData?.eventLocation?.locationDetails}</p>}
                </div>
              </div>
            )}
            {eventData?.eventLocation?.countryCode && eventData?.eventLocation?.country && (
              <div className="flex items-center space-x-3 pt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`https://flagcdn.com/w40/${eventData?.eventLocation?.countryCode.toLowerCase()}.png`}
                    alt={eventData?.eventLocation?.country}
                  />
                  <AvatarFallback>{eventData?.eventLocation?.countryCode}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{eventData?.eventLocation?.country}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}