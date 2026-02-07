import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import kakaoClient from "@/app/api/kakao/kakao.client";
import {
  kakaoSearchBooksParamsSchema,
  KakaoSearchBooksResponse,
  kakaoSearchBooksResponseSchema,
} from "../../../../../infra/http/kakao/kakao-search-books.schema";

// kakao api proxy

export const KAKAO_SEARCH_BOOKS_PATH = "/v3/search/book";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const validParams = kakaoSearchBooksParamsSchema.safeParse(searchParams);

    if (!validParams.success) {
      return NextResponse.json(
        { message: "Invalid query", issues: validParams.error.issues },
        { status: 400 }
      );
    }

    const kakaoResponse = await kakaoClient
      .get<KakaoSearchBooksResponse>(KAKAO_SEARCH_BOOKS_PATH, {
        searchParams: validParams.data,
      })
      .json();

    const validResponse =
      kakaoSearchBooksResponseSchema.safeParse(kakaoResponse);

    if (!validResponse.success) {
      return NextResponse.json(
        {
          message: "Invalid kakao response",
          issues: validResponse.error.issues,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(validResponse.data);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid query or response", issues: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
