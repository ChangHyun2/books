import { Book } from "@/domain/books/book.model";

export type LikedBooksMap = Map<Book["id"], Book>;

const isValidBookId = (bookId: unknown): bookId is Book["id"] => {
  return typeof bookId === "string" && bookId.length > 0;
};

const like = (likedBooksMap: LikedBooksMap, book: Book): void => {
  likedBooksMap.set(book.id, book);
};

const unlike = (likedBooksMap: LikedBooksMap, book: Book): void => {
  likedBooksMap.delete(book.id);
};

const toArray = (likedBooksMap: LikedBooksMap): Book[] => {
  return Array.from(likedBooksMap.values());
};

const loadLikedBooksMap = (raw: unknown): LikedBooksMap => {
  const likedBooksMap = new Map<Book["id"], Book>();

  if (!Array.isArray(raw)) return likedBooksMap;

  for (const book of raw) {
    if (!isValidBookId(book.id)) continue;
    likedBooksMap.set(book.id, book);
  }

  return likedBooksMap;
};

const likesPolicy = {
  loadLikedBooksMap,
  like,
  unlike,
  toArray,
} as const;

export default likesPolicy;
