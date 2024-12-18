"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOption } from "./types";

interface FilterSelectProps {
  options: FilterOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export function FilterSelect({
  options,
  value,
  onSelect,
  placeholder,
  disabled
}: FilterSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onSelect}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}