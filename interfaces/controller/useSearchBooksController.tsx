import {
  SearchBooksInput,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialSearchBooksInput: SearchBooksUIInput = {
  value: "",
  type: undefined,
  page: 1,
  perPage: 10,
};

type SearchBooksController = {
  searchBooksQuery: ReturnType<typeof useSearchBooksQuery>;
  submit: (patch: Partial<SearchBooksUIInput>) => void;
};

const SearchBooksControllerContext = createContext<SearchBooksController | null>(
  null
);

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
  const form = useForm<SearchBooksInput>({
    resolver: zodResolver(searchBooksInputSchema),
    defaultValues: initialSearchBooksInput,
  });

  const [searchBooksValidInput, setSearchBooksValidInput] =
    useState<SearchBooksValidInput>();

  const searchBooksQuery = useSearchBooksQuery({ usecase, searchBooksValidInput });

  const submit = useCallback(
    (patch: Partial<SearchBooksUIInput>) => {
      const next: SearchBooksUIInput = {
        ...initialSearchBooksInput,
        ...form.getValues(),
        ...patch,
        value: patch.value !== undefined ? patch.value.trim() : form.getValues().value?.trim?.() ?? "",
      };

      // Sync UI-held values into RHF only when submitting.
      form.reset(next);

      // Validate (zodResolver) + then trigger react-query via valid input state.
      form.handleSubmit((values) => {
        const valid = searchBooksInputSchema.parse(values);
        setSearchBooksValidInput(valid);
      })();
    },
    [form]
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
