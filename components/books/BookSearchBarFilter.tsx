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
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";

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
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button>상세검색</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Content onSubmit={onSubmit} />
      </PopoverContent>
    </Popover>
  );
}

function Content({
  onSubmit,
}: {
  onSubmit: (payload: DetailSearchPayload) => void;
}) {
  const [searchType, setSearchType] = useState<DetailSearchBookType>("title");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchType = (value: DetailSearchBookType) => {
    setSearchType(value);
  };

  const handleChangeSearchValue: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setSearchValue(value.trim());
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit({ type: searchType, value: searchValue });
    }
  };

  const handleClickSearchButton = () => {
    onSubmit({ type: searchType, value: searchValue });
  };

  return (
    <div>
      <div className="flex justify-end -mt-2 mb-2">
        <PopoverClose asChild>
          <Button variant="ghost" size="icon">
            <X />
          </Button>
        </PopoverClose>
      </div>
      <div className="flex gap-1 mb-4">
        <Select value={searchType} onValueChange={handleChangeSearchType}>
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
          onChange={handleChangeSearchValue}
          onKeyDown={handleKeyDownInput}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        onClick={handleClickSearchButton}
      >
        검색하기
      </Button>
    </div>
  );
}
