import { Book } from "@/domain/books/book.model";
import { create } from "zustand";

type LikedBooksStore = {
  likedBooks: Book[];
  likedBookSet: Set<Book["id"]>;
  load: (books: Book[]) => void;
  like: (book: Book) => void;
  unlike: (book: Book) => void;
};

export const useLikedBooksStore = create<LikedBooksStore>((set) => ({
  likedBooks: [],
  likedBookSet: new Set<Book["id"]>(),
  load: (books: Book[]) => {
    set({
      likedBooks: books,
      likedBookSet: new Set(books.map((book) => book.id)),
    });
  },
  like: (book: Book) => {
    set((state) => {
      if (state.likedBookSet.has(book.id)) return state;

      const nextSet = new Set(state.likedBookSet);
      nextSet.add(book.id);

      return {
        likedBookSet: nextSet,
        likedBooks: [book, ...state.likedBooks],
      };
    });
  },
  unlike: (book: Book) => {
    set((state) => {
      if (!state.likedBookSet.has(book.id)) return state;

      const nextSet = new Set(state.likedBookSet);
      nextSet.delete(book.id);

      return {
        likedBookSet: nextSet,
        likedBooks: state.likedBooks.filter((b) => b.id !== book.id),
      };
    });
  },
}));
