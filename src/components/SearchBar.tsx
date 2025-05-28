import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Icon
        name="Search"
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        placeholder="Поиск товаров..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 h-12 text-base"
      />
    </div>
  );
};

export default SearchBar;
