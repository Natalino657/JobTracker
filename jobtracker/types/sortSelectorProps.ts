import { Sort } from "./sortType";

export type SortSelectorProps = {
  sortOption: Sort;
  onSortChange: (value: Sort) => void;
  options: readonly Sort[];
};
