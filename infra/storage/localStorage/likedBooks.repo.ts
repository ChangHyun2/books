import { Book } from "@/domain/books/book.model";
import myLocalStorage from "./instance";
import { LIKED_BOOKS_STORAGE_KEY } from "@/constants/localStorage";
import likesPolicy, {
  LikedBooksMap,
} from "@/application/policies/likes.policy";
import { LikedBooksRepo } from "@/application/ports/bookLikes.repo";

export class LikedBooksRepoImpl implements LikedBooksRepo {
  private readonly STORAGE_KEY = LIKED_BOOKS_STORAGE_KEY;
  private likedBooksMap: LikedBooksMap = new Map();

  constructor() {
    this.likedBooksMap = likesPolicy.loadLikedBooksMap(
      myLocalStorage.get<unknown>(this.STORAGE_KEY)
    );
  }

  persist = () => {
    try {
      myLocalStorage.set(
        this.STORAGE_KEY,
        likesPolicy.toArray(this.likedBooksMap)
      );
      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      }
      return false;
    }
  };

  isLiked = (book: Book): boolean => {
    return this.likedBooksMap.has(book.id);
  };

  likeBook = (book: Book): boolean => {
    const oldLikedBooksMap = new Map(this.likedBooksMap);
    likesPolicy.like(this.likedBooksMap, book);
    const isPersisted = this.persist();
    if (!isPersisted) {
      this.likedBooksMap = oldLikedBooksMap;
    }
    return isPersisted;
  };

  unlikeBook = (book: Book): boolean => {
    const oldLikedBooksMap = new Map(this.likedBooksMap);
    likesPolicy.unlike(this.likedBooksMap, book);
    const isPersisted = this.persist();
    if (!isPersisted) {
      this.likedBooksMap = oldLikedBooksMap;
    }
    return isPersisted;
  };

  getLikedBooks = (): Book[] => likesPolicy.toArray(this.likedBooksMap);
}

export const createBookLikesRepo = (): LikedBooksRepo => {
  return new LikedBooksRepoImpl();
};
