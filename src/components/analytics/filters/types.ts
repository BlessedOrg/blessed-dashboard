export interface FilterOption {
  label: string;
  id: string;
  param: string;
  key: string;
}

export interface FiltersData {
  isAdmin: boolean;
  filters: {
    apps: FilterOption[];
    events: FilterOption[];
    developers?: FilterOption[];
  };
}

export interface SelectedFilters {
  param: string;
  key: string;
  value: string;
}