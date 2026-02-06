import { getSearchBooks } from "./books.fetch";
import { BooksRepo } from "@/application/repos/books.repo";

export const bookRepo: BooksRepo = {
  searchBooks: async (validInput) => {
    return getSearchBooks(validInput);
  },
};
