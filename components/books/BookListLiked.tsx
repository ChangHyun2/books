"use client";

import { useBooksLikedController } from "@/interfaces/controller/useBooksLikedController";
import BookList from "./BookList";

export default function BookListLiked() {
  const { usecase } = useBooksLikedController();
  const likedBooks = usecase.getLikedBooks();
  return <BookList books={likedBooks} totalCount={likedBooks.length} />;
}
