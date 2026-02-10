"use client";

import BookList from "../BookList";
import { useLikedBooksStore } from "@/interfaces/stores/useLikedBooksStore";

export default function BookListLiked() {
  const { likedBooks } = useLikedBooksStore();

  return <BookList books={likedBooks} totalCount={likedBooks.length} />;
}
