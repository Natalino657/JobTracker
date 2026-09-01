import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortSelectorProps } from "@/types/sortSelectorProps";
import { Sort } from "@/types/sortType";

export function SortSelector({
  sortOption,
  onSortChange,
  options,
}: SortSelectorProps) {
  return (
    <Select
      value={sortOption}
      onValueChange={(value) => onSortChange(value as Sort)}
    >
      <SelectTrigger className="w-full max-w-30">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordernar por</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
