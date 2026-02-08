"use client";

import BookSearchBarFilter from "./BookSearchBarFilter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { DetailSearchPayload } from "./BookSearchBarFilter";
import { SubmitEventHandler, useState } from "react";
import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";

export default function BookSearchBar() {
  const { submit } = useSearchBooksController();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmitAll: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submit({ type: undefined, value: searchValue });
  };

  const handleSubmitDetail = (payload: DetailSearchPayload) => {
    setSearchValue(payload.value);
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
