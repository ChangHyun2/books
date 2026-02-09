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
  useEffect,
} from "react";
import useSearchBooksQuery from "../react-query/queries/useSearchBooksQuery";
import { getTotalPages } from "@/interfaces/presenter/fromDomain/utils/pagination.presenter";
import { KAKAO_SEARCH_BOOKS_MAX_PAGE } from "@/infra/http/kakao/kakao-search-books.schema";
import { ZodError } from "zod";
import { createBooksRepo } from "@/infra/http/next/books/books.repo";
import { createSearchHistoryRepo } from "@/infra/storage/localStorage/searchHistory.repo";
import { SearchHistoryItem } from "@/application/ports/searchHistory.repo";
import useSearchHistoryStore from "../stores/useSearchHistoryStore";

type SearchBooksController = {
  searchBooksQuery: ReturnType<typeof useSearchBooksQuery>;
  submit: (patch: Partial<SearchBooksUIInput>) => void;
  totalPages: number;
  totalCount: number;
  removeHistoryItem: (item: SearchHistoryItem) => void;
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
  const usecase = useMemo(
    () => createSearchBooksUsecase(createBooksRepo()),
    []
  );
  const historyRepo = useMemo(() => createSearchHistoryRepo(), []);
  const syncHistoryItems = useSearchHistoryStore((s) => s.syncHistoryItems);
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

        const isSubmitAll = valid.type === undefined;

        if (isSubmitAll) {
          historyRepo.set({
            type: valid.type,
            value: valid.value,
          });
          syncHistoryItems(historyRepo.toArray());
        }
      } catch (error) {
        if (error instanceof ZodError) {
          window.alert(error.issues.map((issue) => issue.message).join("\n"));
        } else {
          window.alert("unknown error");
        }
      }
    },
    [searchBooksValidInput, historyRepo, syncHistoryItems]
  );

  const removeHistoryItem = useCallback(
    (item: SearchHistoryItem) => {
      historyRepo.remove(item);
      syncHistoryItems(historyRepo.toArray());
    },
    [historyRepo, syncHistoryItems]
  );

  useEffect(() => {
    syncHistoryItems(historyRepo.toArray());
  }, [historyRepo, syncHistoryItems]);

  const controller: SearchBooksController = useMemo(
    () => ({
      searchBooksQuery,
      submit,
      totalPages,
      totalCount,
      removeHistoryItem,
    }),
    [searchBooksQuery, submit, totalPages, totalCount, removeHistoryItem]
  );

  return (
    <SearchBooksControllerContext.Provider value={controller}>
      {children}
    </SearchBooksControllerContext.Provider>
  );
}
