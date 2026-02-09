import type { SearchBooksValidInput } from "./searchBooks.port";

export type SearchHistoryItem = {
  type: SearchBooksValidInput["type"]; // undefined면 전체검색
  value: string;
};

export type SearchHistoryRepo = {
  toArray: () => SearchHistoryItem[];
  set: (item: SearchHistoryItem) => void;
  remove: (item: SearchHistoryItem) => boolean;
  clear: () => void;
};
