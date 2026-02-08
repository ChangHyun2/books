"use client";

import {
  SearchBooksUIInput,
  SearchBooksValidInput,
  searchBooksInputSchema,
} from "@/application/ports/searchBooks.port";
import { createSearchBooksUsecase } from "@/application/usecases/books/search-books";

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
import { bookRepo } from "@/infra/http/next/books/books.repo";
import { getTotalPages } from "@/interfaces/presenter/fromDomain/utils/pagination.presenter";
import { KAKAO_SEARCH_BOOKS_MAX_PAGE } from "@/infra/http/kakao/kakao-search-books.schema";

type SearchBooksController = {
  searchBooksQuery: ReturnType<typeof useSearchBooksQuery>;
  submit: (patch: Partial<SearchBooksUIInput>) => void;
  totalPages: number;
  totalCount: number;
};

const SearchBooksControllerContext =
  createContext<SearchBooksController | null>(null);

export function useSearchBooksController() {
  const ctx = useContext(SearchBooksControllerContext);
  if (!ctx) {
    throw new Error(
      "useSearchBooksController must be used within SearchBooksProvider"
    );
  }
  return ctx;
}

export function SearchBooksControllerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchBooksValidInput, setSearchBooksValidInput] =
    useState<SearchBooksValidInput>();

  const usecase = useMemo(() => createSearchBooksUsecase(bookRepo), []);
  const searchBooksQuery = useSearchBooksQuery({
    usecase,
    searchBooksValidInput,
  });

  const queryTotalCount = searchBooksQuery.data?.totalCount;
  const perPage = searchBooksValidInput?.perPage;

  const totalPages = useMemo(() => {
    if (queryTotalCount === undefined || perPage === undefined) return 0;
    return Math.min(
      getTotalPages(queryTotalCount, perPage),
      KAKAO_SEARCH_BOOKS_MAX_PAGE
    );
  }, [queryTotalCount, perPage]);

  const totalCount = useMemo(() => {
    if (perPage === undefined) return 0;
    return totalPages * perPage;
  }, [totalPages, perPage]);

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

  const controller = useMemo(
    () => ({
      searchBooksQuery,
      submit,
      totalPages,
      totalCount,
    }),
    [searchBooksQuery, submit, totalPages, totalCount]
  );

  return (
    <SearchBooksControllerContext.Provider value={controller}>
      {children}
    </SearchBooksControllerContext.Provider>
  );
}
