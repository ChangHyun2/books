import BookSearchBarFilter from "./BookSearchBarFilter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useSearchBooksUIController } from "@/interfaces/controller/useSearchBooksController";
import { Search } from "lucide-react";
import { SubmitEventHandler, useState } from "react";
import { DetailSearchPayload } from "./BookSearchBarFilter";

export default function BookSearchBar() {
  const { searchBooks } = useSearchBooksUIController();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchBookValue: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    setSearchValue(trimmedValue);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    searchBooks(undefined, searchValue);
  };

  const handleSubmitDetail = (payload: DetailSearchPayload) => {
    searchBooks(payload.type, payload.value);
    setSearchValue(payload.value);
  };

  return (
    <form id="search-books-form" className="flex gap-2" onSubmit={handleSubmit}>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="검색어를 입력해주세요."
          value={searchValue}
          onChange={handleChangeSearchBookValue}
        />
        <InputGroupAddon>
          <Search type="submit" />
        </InputGroupAddon>
      </InputGroup>
      <BookSearchBarFilter onSubmit={handleSubmitDetail} />
    </form>
  );
}
