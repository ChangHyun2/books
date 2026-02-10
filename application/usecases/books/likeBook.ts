import { LikedBooksRepo } from "@/application/ports/bookLikes.repo";
import { Book } from "@/domain/books/book.model";

export type LikeBookUsecase = {
  likeBook: (book: Book) => boolean;
  unlikeBook: (book: Book) => boolean;
  getLikedBooks: () => Book[];
};

export const createLikeBookUsecase = (
  likedBooksRepo: LikedBooksRepo
): LikeBookUsecase => {
  return {
    likeBook: (book: Book) => {
      return likedBooksRepo.likeBook(book);
    },
    unlikeBook: (book: Book) => {
      return likedBooksRepo.unlikeBook(book);
    },
    getLikedBooks: () => {
      return likedBooksRepo.getLikedBooks();
    },
  };
};
 