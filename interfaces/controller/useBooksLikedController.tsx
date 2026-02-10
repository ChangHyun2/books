"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { createBookLikesRepo } from "@/infra/storage/localStorage/likedBooks.repo";
import { createLikeBookUsecase } from "@/application/usecases/books/likeBook";
import { Book } from "@/domain/books/book.model";
import { useLikedBooksStore } from "../stores/useLikedBooksStore";

const BooksLikedControllerContext = createContext<BooksLikedController | null>(
  null
);

type BooksLikedController = {
  likeBook: (book: Book) => void;
  unlikeBook: (book: Book) => void;
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
  const like = useLikedBooksStore((state) => state.like);
  const unlike = useLikedBooksStore((state) => state.unlike);
  const load = useLikedBooksStore((state) => state.load);

  const likeBook = useCallback(
    (book: Book) => {
      const isSuccess = usecase.likeBook(book);
      if (isSuccess) {
        like(book);
      }
    },
    [usecase, like]
  );

  const unlikeBook = useCallback(
    (book: Book) => {
      const isSuccess = usecase.unlikeBook(book);
      if (isSuccess) {
        unlike(book);
      }
    },
    [usecase, unlike]
  );

  useEffect(() => {
    const books = usecase.getLikedBooks();
    load(books);
  }, [usecase, load]);

  return (
    <BooksLikedControllerContext.Provider value={{ likeBook, unlikeBook }}>
      {children}
    </BooksLikedControllerContext.Provider>
  );
}
