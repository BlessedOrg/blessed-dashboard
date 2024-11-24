"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Ticket, Users } from "lucide-react";

interface TicketPreviewProps {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  initialCapacity: number;
  maxCapacity: number;
}

export function TicketPreview({
  name = "Ticket Name",
  description,
  price = 0,
  imageUrl = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  initialCapacity = 100,
  maxCapacity = 1000
}: TicketPreviewProps) {
  const previewImage = imageUrl?.includes("https://") ? imageUrl : "/img/placeholder_image.jpeg";
  return (
    <Card className="overflow-hidden bg-white">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={previewImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          {description && (
            <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Initial
            </div>
            <p className="text-lg font-semibold">{initialCapacity}</p>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-gray-500 flex items-center">
              <Ticket className="w-4 h-4 mr-1" />
              Maximum
            </div>
            <p className="text-lg font-semibold">{maxCapacity}</p>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-gray-500 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Price
            </div>
            <p className="text-lg font-semibold">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {maxCapacity - initialCapacity} more can be minted
            </Badge>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              Preview
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}