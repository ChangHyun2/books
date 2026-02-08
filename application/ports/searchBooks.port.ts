import { z } from "zod";

export const searchBooksInputSchema = z.object({
  value: z.string().min(1, "value is required").max(3, "value is too long"),
  type: z.enum(["title", "author", "publisher"]).optional(),
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(50).default(10),
});

export type SearchBooksInput = z.input<typeof searchBooksInputSchema>;
export type SearchBooksUIInput = SearchBooksInput & {
  page: number;
  perPage: number;
};
export type SearchBooksValidInput = z.output<typeof searchBooksInputSchema>;
