import { BooksRepo, SearchBooksQuery } from "@/application/ports/books.repo";
import { dtoToBook } from "./book.mapper";
import nextClient from "../next.client";
import { NEXT_SEARCH_BOOKS_PATH } from "../../endpoints";
import {
  KakaoSearchBooksParams,
  KakaoSearchBooksResponse,
} from "@/infra/http/kakao/kakao-search-books.schema";

class booksRepoImpl implements BooksRepo {
  searchBooks = async (query: SearchBooksQuery) => {
    const { value, type, page, perPage } = query;

    const target =
      type === "title"
        ? "title"
        : type === "author"
        ? "person"
        : type === "publisher"
        ? "publisher"
        : undefined;

    const kakaoSearchBooksParams: KakaoSearchBooksParams = {
      query: value,
      target,
      page,
      size: perPage,
      sort: "accuracy",
    };

    const response = await nextClient
      .get<KakaoSearchBooksResponse>(NEXT_SEARCH_BOOKS_PATH, {
        searchParams: kakaoSearchBooksParams,
      })
      .json();

    return {
      books: response.documents.map(dtoToBook),
      totalAvailableCount: response.meta.pageable_count,
    };
  };
}

export function createBooksRepo(): BooksRepo {
  return new booksRepoImpl();
}
