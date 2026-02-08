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
import { useForm, type FieldErrors, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialSearchBooksInput: SearchBooksUIInput = {
  value: "",
  type: undefined,
  page: 1,
  perPage: 10,
};

function collectRHFErrorMessages(
  errors: FieldErrors<FieldValues>,
  prefix = ""
): string[] {
  const messages: string[] = [];
  const record = errors as Record<string, unknown>;

  for (const [key, value] of Object.entries(record)) {
    if (!value) continue;

    const fieldPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      const maybeError = value as Record<string, unknown>;
      const message = maybeError.message;
      const isFieldErrorLike =
        "type" in maybeError || "ref" in maybeError || "types" in maybeError;

      if (typeof message === "string") {
        messages.push(`${fieldPath}: ${message}`);
        continue;
      }

      if (!isFieldErrorLike) {
        messages.push(
          ...collectRHFErrorMessages(
            value as unknown as FieldErrors<FieldValues>,
            fieldPath
          )
        );
      }
    }
  }

  return messages;
}

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
  const form = useForm<SearchBooksInput, unknown, SearchBooksValidInput>({
    resolver: zodResolver(searchBooksInputSchema),
    defaultValues: initialSearchBooksInput,
  });

  const submit = useCallback(
    (patch: Partial<SearchBooksUIInput>) => {
      const next: SearchBooksUIInput = {
        ...initialSearchBooksInput,
        ...form.getValues(),
        ...patch,
        value:
          patch.value !== undefined
            ? patch.value.trim()
            : form.getValues().value?.trim?.() ?? "",
      };

      form.reset(next);

      // Validate (zodResolver) + then trigger react-query via valid input state.
      form.handleSubmit(
        (values) => {
          setSearchBooksValidInput(values);
        },
        (errors) => {
          const messages = collectRHFErrorMessages(errors);
          if (messages.length > 0) {
            window.alert(messages.join("\n"));
          }
        }
      )();
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
