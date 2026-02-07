import { SearchBooksValidInput } from "@/application/ports/searchBooks.port";

export const booksKeys = {
  search: (searchBooksValidInput: SearchBooksValidInput) =>
    [
      "books",
      "search",
      searchBooksValidInput.type,
      searchBooksValidInput.value,
      searchBooksValidInput.page,
      searchBooksValidInput.perPage,
    ] as const,
};
