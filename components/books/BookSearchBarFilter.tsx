import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { SearchBooksUIInput } from "@/application/ports/searchBooks.port";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { KeyboardEventHandler, useState } from "react";

type DetailSearchBookType = NonNullable<SearchBooksUIInput["type"]>;
export type DetailSearchPayload = {
  type: DetailSearchBookType;
  value: string;
};

const searchBookTypeOptions: {
  label: string;
  value: DetailSearchBookType;
}[] = [
  { label: "제목", value: "title" },
  { label: "저자명", value: "author" },
  { label: "출판사", value: "publisher" },
];

export default function BookSearchBarFilter({
  onSubmit,
}: {
  onSubmit: (payload: DetailSearchPayload) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button>상세검색</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverContentComponent onSubmit={onSubmit} onClose={closePopover} />
      </PopoverContent>
    </Popover>
  );
}

function PopoverContentComponent({
  onSubmit,
  onClose,
}: {
  onSubmit: (payload: DetailSearchPayload) => void;
  onClose: () => void;
}) {
  const [searchType, setSearchType] = useState<DetailSearchBookType>("title");
  const [searchValue, setSearchValue] = useState("");

  const submit = () => {
    onSubmit({ type: searchType, value: searchValue.trim() });
    onClose();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div>
      <div className="flex justify-end -mt-2 mb-2">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X />
        </Button>
      </div>
      <div className="flex gap-1 mb-4">
        <Select
          value={searchType}
          onValueChange={(value: DetailSearchBookType) => setSearchType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {searchBookTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button type="button" className="w-full" onClick={submit}>
        검색하기
      </Button>
    </div>
  );
}
