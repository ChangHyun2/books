"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import { createBookLikesRepo } from "@/infra/storage/localStorage/likedBooks.repo";
import { createLikeBookUsecase } from "@/application/usecases/books/likeBook";

const BooksLikedControllerContext = createContext<BooksLikedController | null>(
  null
);

type BooksLikedController = {
  usecase: ReturnType<typeof createLikeBookUsecase>;
  likedBooksRepo: ReturnType<typeof createBookLikesRepo>;
};

export function useBooksLikedController() {
  const ctx = useContext(BooksLikedControllerContext);
  if (!ctx) {
    throw new Error(
      "useBooksLikedController must be used within BooksLikedControllerProvider"
    );
  }
  return ctx;
}

export function BooksLikedControllerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const likedBooksRepo = useMemo(() => createBookLikesRepo(), []);
  const usecase = useMemo(
    () => createLikeBookUsecase(likedBooksRepo),
    [likedBooksRepo]
  );

  return (
    <BooksLikedControllerContext.Provider value={{ usecase, likedBooksRepo }}>
      {children}
    </BooksLikedControllerContext.Provider>
  );
}
