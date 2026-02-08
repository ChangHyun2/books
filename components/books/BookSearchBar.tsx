import BookSearchBarFilter from "./BookSearchBarFilter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useSearchBooks } from "@/interfaces/controller/useSearchBooksController";
import { Search } from "lucide-react";
import { DetailSearchPayload } from "./BookSearchBarFilter";
import { useState } from "react";

export default function BookSearchBar() {
  const { submit } = useSearchBooks();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmitAll: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("submit all");
    submit({ type: undefined, value: searchValue });
  };

  const handleSubmitDetail = (payload: DetailSearchPayload) => {
    setSearchValue(payload.value);
    console.log("submit detail");
    submit({ type: payload.type, value: payload.value });
  };

  return (
    <form
      id="search-books-form"
      className="flex gap-2"
      onSubmit={handleSubmitAll}
    >
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="검색어를 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <button type="submit" aria-label="검색">
            <Search />
          </button>
        </InputGroupAddon>
      </InputGroup>
      <BookSearchBarFilter onSubmit={handleSubmitDetail} />
    </form>
  );
}
