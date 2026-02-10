import { Book } from "@/domain/books/book.model";

export type LikedBooksRepo = {
  isLiked: (book: Book) => boolean;
  likeBook: (book: Book) => boolean;
  unlikeBook: (book: Book) => boolean;
  getLikedBooks: () => Book[];
};
