import { z } from "zod";
import kakaoClient from "../kakao.client";
import { BookDto } from "./books.dto";
import { PaginationMetaDto } from "../meta/pagination/pagination.dto";
import { omitUndefined } from "@/utils/object/omitUndefined";
import { KAKAO_SEARCH_BOOKS_PATH } from "../endpoints";

export const searchBooksRequestSchema = z.object({
  query: z.string().min(1, "query is required"),
  sort: z.enum(["accuracy", "latest"]).optional(),
  page: z.coerce.number().int().min(1).max(50).default(1),
  size: z.coerce.number().int().min(1).max(50).default(10),
  target: z.enum(["title", "isbn", "publisher", "person"]).optional(),
});

export type SearchBooksQuery = z.infer<typeof searchBooksRequestSchema>;

export type SearchBooksResponse = {
  meta: PaginationMetaDto;
  documents: Array<BookDto>;
};

export const getSearchBooks = (request: SearchBooksQuery) => {
  const { query, sort, page, size, target } =
    searchBooksRequestSchema.parse(request);

  const searchParams = omitUndefined({
    query,
    sort,
    page,
    size,
    target,
  });

  const response = kakaoClient.get<SearchBooksResponse>(
    KAKAO_SEARCH_BOOKS_PATH,
    {
      searchParams,
    }
  );

  return response.json();
};
