import {
  SearchBooksUIInput,
  SearchBooksValidInput,
  searchBooksInputSchema,
} from "@/application/ports/searchBooks.port";
import { SearchBooksUsecase } from "@/application/usecases/books/search-books";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import useSearchBooksQuery from "../react-query/queries/useSearchBooksQuery";
import { ZodError } from "zod";

type SearchBooksController = {
  searchBooksQuery: ReturnType<typeof useSearchBooksQuery>;
  submit: (patch: Partial<SearchBooksUIInput>) => void;
};

const SearchBooksControllerContext =
  createContext<SearchBooksController | null>(null);

export function useSearchBooks() {
  const ctx = useContext(SearchBooksControllerContext);
  if (!ctx) {
    throw new Error("useSearchBooks must be used within SearchBooksProvider");
  }
  return ctx;
}

export function SearchBooksProvider({
  usecase,
  children,
}: {
  usecase: SearchBooksUsecase;
  children: ReactNode;
}) {
  const controller = useSearchBooksController({ usecase });
  return (
    <SearchBooksControllerContext.Provider value={controller}>
      {children}
    </SearchBooksControllerContext.Provider>
  );
}

function useSearchBooksController({
  usecase,
}: {
  usecase: SearchBooksUsecase;
}) {
  const [searchBooksValidInput, setSearchBooksValidInput] =
    useState<SearchBooksValidInput>();
  const searchBooksQuery = useSearchBooksQuery({
    usecase,
    searchBooksValidInput,
  });

  const submit = useCallback(
    (patch: Partial<SearchBooksUIInput>) => {
      try {
        const next = { ...searchBooksValidInput, ...patch };
        const valid = searchBooksInputSchema.parse(next);
        setSearchBooksValidInput(valid);
      } catch (error) {
        if (error instanceof ZodError) {
          window.alert(error.issues.map((issue) => issue.message).join("\n"));
        } else {
          window.alert("unknown error");
        }
      }
    },
    [searchBooksValidInput]
  );

  // Stable controller reference for context consumers.
  return useMemo(
    () => ({
      searchBooksQuery,
      submit,
    }),
    [searchBooksQuery, submit]
  );
}
