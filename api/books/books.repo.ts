import { dtoToBook } from "./books.mapper";
import { SearchBooksQuery, getSearchBooks } from "./books.api";
import { dtoToPagination } from "../meta/pagination/pagination.mapper";

export const searchBooks = async (query: SearchBooksQuery) => {
  const response = await getSearchBooks(query);

  const books = response.documents.map(dtoToBook);
  const pagination = dtoToPagination({
    ...response.meta,
    page: query.page,
    size: query.size,
  });

  return {
    books,
    pagination,
  };
};
