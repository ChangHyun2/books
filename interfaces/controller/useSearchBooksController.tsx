import {
  SearchBooksUIInput,
  searchBooksInputSchema,
} from "@/application/ports/searchBooks.port";
import { SearchBooksUsecase } from "@/application/usecases/books/search-books";

import { useMemo, useState } from "react";
import useSearchBooksQuery from "../react-query/queries/useSearchBooksQuery";

export default function useSearchBooksController({
  usecase,
}: {
  usecase: SearchBooksUsecase;
}) {
  const [searchBooksInput, setSearchBooksInput] = useState<SearchBooksUIInput>({
    value: "",
    type: "title",
    page: 1,
    perPage: 10,
  });

  const searchBooksSafeParsed = useMemo(
    () => searchBooksInputSchema.safeParse(searchBooksInput).data,
    [searchBooksInput]
  );

  const searchBooksQuery = useSearchBooksQuery({
    usecase,
    searchBooksValidInput: searchBooksSafeParsed,
  });

  const changeSearchValue = (value: string) => {
    setSearchBooksInput((prev) => ({ ...prev, value, page: 1 }));
  };

  const changeSearchType = (type: "title" | "author" | "publisher") => {
    setSearchBooksInput((prev) => ({ ...prev, type, page: 1 }));
  };

  const nextPage = () => {
    setSearchBooksInput((prev) => ({
      ...prev,
      page: searchBooksInput.page + 1,
    }));
  };

  const previousPage = () => {
    setSearchBooksInput((prev) => ({
      ...prev,
      page: Math.max(1, searchBooksInput.page - 1),
    }));
  };

  const changePage = (page: number) => {
    setSearchBooksInput((prev) => ({ ...prev, page }));
  };

  return {
    nextPage,
    previousPage,
    changePage,
    changeSearchType,
    changeSearchValue,
    searchBooksQuery,
  };
}
