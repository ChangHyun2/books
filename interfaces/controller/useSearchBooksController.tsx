import { SearchBooksValidInput } from "@/application/ports/searchBooks.port";
import { SearchBooksUsecase } from "@/application/usecases/books/search-books";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useSearchBooksController({
  usecase,
}: {
  usecase: SearchBooksUsecase;
}) {
  const [searchBooksInput, setSearchBooksInput] =
    useState<SearchBooksValidInput>({
      value: "",
      type: "title",
      page: 1,
      perPage: 10,
    });

  const searchBooksQuery = useQuery({
    queryKey: ["search-books"],
    queryFn: () => usecase.execute(searchBooksInput),
    enabled: searchBooksInput.value.length > 0,
  });

  const changeSearchValue = (value: string) => {
    setSearchBooksInput({ ...searchBooksInput, value });
  };

  const changeSearchType = (type: "title" | "author" | "publisher") => {
    setSearchBooksInput({ ...searchBooksInput, type });
  };

  const nextPage = () => {
    setSearchBooksInput({
      ...searchBooksInput,
      page: searchBooksInput.page + 1,
    });
  };

  const previousPage = () => {
    setSearchBooksInput({
      ...searchBooksInput,
      page: searchBooksInput.page - 1,
    });
  };

  const changePage = (page: number) => {
    setSearchBooksInput({ ...searchBooksInput, page });
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
