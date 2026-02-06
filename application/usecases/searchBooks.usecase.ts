import { Pagination } from "@/models/meta/pagination.model";
import { BooksRepo, SearchBooksValidInput } from "../repos/books.repo";

export const searchBooksUsecase = async (
  booksRepo: BooksRepo,
  searchBooksInput: SearchBooksValidInput
) => {
  const { books, totalAvailableItems } = await booksRepo.searchBooks(
    searchBooksInput
  );

  const { page, perPage } = searchBooksInput;

  const pagination: Pagination = {
    page,
    perPage,
    totalItems: totalAvailableItems,
  };

  return { books, pagination };
};
