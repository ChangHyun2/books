import { Book } from "@/models/books/book.model";
import { SearchBooksValidInput } from "@/application/repos/books.repo";

import nextClient from "../next.client";
import { NEXT_SEARCH_BOOKS_PATH } from "../endpoints";

export type SearchBooksResponse = {
  books: Book[];
  totalAvailableItems: number;
};

export const getSearchBooks = async (
  validInput: SearchBooksValidInput
): Promise<SearchBooksResponse> => {
  const params = new URLSearchParams({
    value: validInput.value,
    type: validInput.type,
    page: String(validInput.page),
    perPage: String(validInput.perPage),
  });

  const response = await nextClient.get<SearchBooksResponse>(
    NEXT_SEARCH_BOOKS_PATH,
    {
      searchParams: params,
    }
  );

  return response.json<SearchBooksResponse>();
};
