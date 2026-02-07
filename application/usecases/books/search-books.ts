import { Book } from "@/domain/books/book.model";
import { BooksRepo } from "../../ports/books.repo";
import { SearchBooksValidInput } from "@/application/ports/searchBooks.port";

export type SearchBooksUsecase = {
  execute: (
    searchBooksValidInput: SearchBooksValidInput
  ) => Promise<{ books: Book[]; totalCount: number }>;
};

export const createSearchBooksUsecase = (
  booksRepo: BooksRepo
): SearchBooksUsecase => {
  return {
    execute: async (searchBooksValidInput) => {
      const query = searchBooksValidInput;
      const { books, totalAvailableCount } = await booksRepo.searchBooks(query);
      return { books, totalCount: totalAvailableCount };
    },
  };
};
