"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

const eventTypes = [
  { value: "public", label: "Public Events" },
  { value: "my", label: "My Events" }
];

interface EventTypeSelectProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export function EventTypeSelect({ selectedTypes, onChange }: EventTypeSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleType = (value: string) => {
    const newTypes = selectedTypes.includes(value)
      ? selectedTypes.filter(t => t !== value)
      : [...selectedTypes, value];
    onChange(newTypes);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 justify-start">
          {selectedTypes.length > 0 && (
            <Badge variant="secondary" className="mr-2">
              {selectedTypes.length}
            </Badge>
          )}
          Event Types
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>No event types found.</CommandEmpty>
          <CommandGroup>
            {eventTypes.map((type) => (
              <CommandItem
                key={type.value}
                onSelect={() => toggleType(type.value)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedTypes.includes(type.value)
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <Check className={cn("h-4 w-4")} />
                </div>
                <span>{type.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}