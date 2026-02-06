import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { searchBooksInputSchema } from "@/application/repos/books.repo";
import { kakaoSearchBooks } from "@/infra/http/books/books.kakao.fetch";
import { dtoToBook } from "@/infra/http/books/books.mapper";
import handleError from "@/utils/handleError";

// GET /api/books?value=...&type=title|author|publisher&page=1&perPage=10
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const validatedInput = searchBooksInputSchema.parse({
      value: searchParams.get("value") ?? "",
      type: searchParams.get("type") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      perPage: searchParams.get("perPage") ?? undefined,
    });

    const kakaoQuery = {
      query: validatedInput.value,
      target:
        validatedInput.type === "title"
          ? "title"
          : validatedInput.type === "author"
          ? "person"
          : "publisher",
      page: validatedInput.page,
      size: validatedInput.perPage,
      sort: "accuracy",
    } as const;

    const kakaoResponse = await kakaoSearchBooks(kakaoQuery);

    const books = kakaoResponse.documents.map(dtoToBook);
    const totalAvailableItems = kakaoResponse.meta.pageable_count;

    return NextResponse.json({ books, totalAvailableItems });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid query", issues: error.issues },
        { status: 400 }
      );
    }

    const message = handleError(error);
    return NextResponse.json({ message }, { status: 502 });
  }
}
