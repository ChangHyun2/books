import { SearchHistoryItem } from "@/application/ports/searchHistory.repo";
import { create } from "zustand";

type SearchHistoryStore = {
  historyItems: SearchHistoryItem[];
  syncHistoryItems: (items: SearchHistoryItem[]) => void;
};

const useSearchHistoryStore = create<SearchHistoryStore>((set) => ({
  historyItems: [],
  syncHistoryItems: (items: SearchHistoryItem[]) =>
    set({ historyItems: items }),
}));

export default useSearchHistoryStore;
