"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FilterSelect } from "./FilterSelect";
import { FiltersData, SelectedFilters } from "./types";

const FILTER_PARAMS = [
  { label: "All", value: "all" },
  { label: "Application", value: "app" },
  { label: "Event", value: "event" },
  { label: "Developer", value: "developer" }
];

interface AnalyticsFiltersProps {
  filtersData: FiltersData;
  onChange: (queryString: string) => void;
}

export function AnalyticsFilters({ filtersData, onChange }: AnalyticsFiltersProps) {
  const [selectedParam, setSelectedParam] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilters | null>(null);

  const getOptionsForParam = (param: string) => {
    switch (param) {
      case "app":
        return filtersData.filters.apps;
      case "event":
        return filtersData.filters.events;
      case "developer":
        return filtersData.filters.developers || [];
      default:
        return [];
    }
  };

  const getKeyForParam = (param: string) => {
    const options = getOptionsForParam(param);
    return options[0]?.key || "";
  };

  useEffect(() => {
    if (selectedFilter) {
      const queryString = `?getBy=${selectedFilter.param}&${selectedFilter.key}=${selectedFilter.value}`;
      onChange(queryString);
    }
  }, [selectedFilter, onChange]);

  const handleParamChange = (param: string) => {
    setSelectedParam(param);
    setSelectedFilter(null);
    if (param === "all") {
      onChange("?getBy=all");
    }
  };

  const handleFilterChange = (value: string) => {
    if (!selectedParam) return;

    setSelectedFilter({
      param: selectedParam,
      key: getKeyForParam(selectedParam),
      value
    });
  };

  const availableParams = FILTER_PARAMS.filter(param =>
    filtersData.isAdmin || param.value !== "developer"
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <Label>Filter by</Label>
            <FilterSelect
              options={availableParams.map(p => ({
                id: p.value,
                label: p.label,
                param: p.value,
                key: p.value
              }))}
              value={selectedParam}
              onSelect={handleParamChange}
              placeholder="Select filter type"
            />
          </div>

          {selectedParam !== "all" && <div className="space-y-2">
            <Label>Select {selectedParam}</Label>
            <FilterSelect
              options={getOptionsForParam(selectedParam)}
              value={selectedFilter?.value || ""}
              onSelect={handleFilterChange}
              placeholder={`Select ${selectedParam}`}
              disabled={!selectedParam}
            />
          </div>}
        </div>
      </CardContent>
    </Card>
  );
}