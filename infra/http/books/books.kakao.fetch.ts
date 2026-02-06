import { z } from "zod";

import kakaoClient from "../kakao.client";
import { KAKAO_SEARCH_BOOKS_PATH } from "../endpoints";
import { PaginationMetaDto } from "../meta/pagination/pagination.dto";
import { BookDto } from "./books.dto";

export const kakaoSearchBooksQuerySchema = z.object({
  query: z.string().min(1, "query is required"),
  sort: z.enum(["accuracy", "latest"]).optional(),
  page: z.coerce.number().int().min(1).max(50).default(1),
  size: z.coerce.number().int().min(1).max(50).default(10),
  target: z.enum(["title", "isbn", "publisher", "person"]).optional(),
});

export type KakaoSearchBooksQuery = z.infer<typeof kakaoSearchBooksQuerySchema>;

export type KakaoSearchBooksResponse = {
  meta: PaginationMetaDto;
  documents: Array<BookDto>;
};

export const kakaoSearchBooks = async (query: KakaoSearchBooksQuery) => {
  const {
    query: q,
    sort,
    page,
    size,
    target,
  } = kakaoSearchBooksQuerySchema.parse(query);

  const searchParams = {
    query: q,
    sort,
    page,
    size,
    target,
  };

  const response = kakaoClient.get<KakaoSearchBooksResponse>(
    KAKAO_SEARCH_BOOKS_PATH,
    { searchParams }
  );

  return response.json();
};
