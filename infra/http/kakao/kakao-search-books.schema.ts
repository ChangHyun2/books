import { z } from "zod";

export const KakaoBookDtoSchema = z.object({
  title: z.string(),
  contents: z.string(),
  url: z.string(),
  isbn: z.string(),
  datetime: z.string(),
  authors: z.array(z.string()),
  publisher: z.string(),
  translators: z.array(z.string()),
  price: z.number(),
  sale_price: z.number(),
  thumbnail: z.string(),
  status: z.string(),
});

export const kakaoMetaSchema = z.object({
  pageable_count: z.number(),
  total_count: z.number(),
  is_end: z.boolean(),
});

export type KakaoBookDto = z.output<typeof KakaoBookDtoSchema>;

export const kakaoSearchBooksParamsSchema = z.object({
  query: z.string().min(1, "query is required"),
  sort: z.enum(["accuracy", "latest"]).optional(),
  page: z.coerce.number().int().min(1).max(50).default(1),
  size: z.coerce.number().int().min(1).max(50).default(10),
  target: z.enum(["title", "isbn", "publisher", "person"]).optional(),
});

export type KakaoSearchBooksParams = z.output<
  typeof kakaoSearchBooksParamsSchema
>;

export const kakaoSearchBooksResponseSchema = z.object({
  documents: z.array(KakaoBookDtoSchema),
  meta: kakaoMetaSchema,
});

export type KakaoSearchBooksResponse = z.output<
  typeof kakaoSearchBooksResponseSchema
>;
