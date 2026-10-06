import { Input } from "./ui/input";
import { onSearchProps } from "@/types/onSerachProps";
import { Search } from "lucide-react";

const Searchbar = ({ onSearchChange }: onSearchProps) => {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        className="pl-9"
        placeholder="Pesquisar por empresa ou cargo..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
