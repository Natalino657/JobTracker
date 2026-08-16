import { Input } from "./ui/input";
import { onSearchProps } from "@/types/onSerachProps";

const Searchbar = ({ onSearchChange }: onSearchProps) => {
  //const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Input
        type="search"
        placeholder="Pesquisar candidaturas"
        onChange={(e) => onSearchChange(e.target.value)}
      ></Input>
    </div>
  );
};

export default Searchbar;
