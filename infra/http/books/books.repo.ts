import { dtoToBook } from "./books.mapper";
import { SearchBooksQuery, getSearchBooks } from "./books.fetch";
import { BookRepo } from "@/application/repos/book.repo";

export const bookRepo: BookRepo = {
  searchBooks: async (payload) => {
    const searchBooksQuery: SearchBooksQuery = {
      query: payload.value,
      target:
        payload.type === "title"
          ? "title"
          : payload.type === "author"
          ? "person"
          : "publisher",
      page: payload.page,
      size: payload.perPage,
      sort: "accuracy",
    };

    const response = await getSearchBooks(searchBooksQuery);

    const books = response.documents.map(dtoToBook);
    const totalItems = response.meta.pageable_count;

    return {
      books,
      totalItems,
    };
  },
};
