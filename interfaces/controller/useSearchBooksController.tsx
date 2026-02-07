import {
  SearchBooksUIInput,
  searchBooksInputSchema,
} from "@/application/ports/searchBooks.port";
import { SearchBooksUsecase } from "@/application/usecases/books/search-books";

import { useMemo } from "react";
import useSearchBooksQuery from "../react-query/queries/useSearchBooksQuery";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialSearchBooksInput: SearchBooksUIInput = {
  value: "",
  type: "title",
  page: 1,
  perPage: 10,
};

type SearchBooksUIStore = {
  searchBooksInput: SearchBooksUIInput;
  searchBooks: (
    searchType: SearchBooksUIInput["type"],
    searchValue: string
  ) => void;
  nextPage: () => void;
  previousPage: () => void;
  changePage: (page: number) => void;
};

export const useSearchBooksUIStore = create<SearchBooksUIStore>()(
  immer((set) => ({
    searchBooksInput: initialSearchBooksInput,
    searchBooks: (searchType, searchValue) => {
      set((state) => {
        state.searchBooksInput = {
          value: searchValue,
          type: searchType,
          page: 1,
          perPage: 10,
        };
      });
    },
    nextPage: () =>
      set((state) => {
        state.searchBooksInput.page = state.searchBooksInput.page + 1;
      }),
    previousPage: () =>
      set((state) => {
        state.searchBooksInput.page = Math.max(
          1,
          state.searchBooksInput.page - 1
        );
      }),
    changePage: (page) =>
      set((state) => {
        state.searchBooksInput.page = page;
      }),
  }))
);

export function useSearchBooksUIController() {
  const searchBooksInput = useSearchBooksUIStore(
    (state) => state.searchBooksInput
  );
  const nextPage = useSearchBooksUIStore((state) => state.nextPage);
  const previousPage = useSearchBooksUIStore((state) => state.previousPage);
  const changePage = useSearchBooksUIStore((state) => state.changePage);
  const searchBooks = useSearchBooksUIStore((state) => state.searchBooks);

  return {
    searchBooksInput,
    nextPage,
    previousPage,
    changePage,
    searchBooks,
  };
}

export default function useSearchBooksController({
  usecase,
}: {
  usecase: SearchBooksUsecase;
}) {
  const { searchBooksInput, nextPage, previousPage, changePage } =
    useSearchBooksUIController();

  const searchBooksSafeParsed = useMemo(
    () => searchBooksInputSchema.safeParse(searchBooksInput).data,
    [searchBooksInput]
  );

  console.log("searchBooksSafeParsed", searchBooksSafeParsed);

  const searchBooksQuery = useSearchBooksQuery({
    usecase,
    searchBooksValidInput: searchBooksSafeParsed,
  });

  return {
    searchBooksInput,
    nextPage,
    previousPage,
    changePage,
    searchBooksQuery,
  };
}
