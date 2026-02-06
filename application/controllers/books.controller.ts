import {
  BooksRepo,
  SearchBooksInput,
  searchBooksInputSchema,
} from "@/application/repos/books.repo";
import { searchBooksUsecase } from "@/application/usecases/searchBooks.usecase";

/**
 * UI 경계(Controller / Interface Adapter)
 * - raw input을 검증/정제하고 usecase를 호출한다.
 */
export async function searchBooksController(
  booksRepo: BooksRepo,
  rawInput: SearchBooksInput
) {
  const validInput = searchBooksInputSchema.parse(rawInput);
  return searchBooksUsecase(booksRepo, validInput);
}
