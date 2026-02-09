import {
  SearchHistoryItem,
  SearchHistoryRepo,
} from "@/application/ports/searchHistory.repo";
import myLocalStorage from "./instance";

import searchHistoryPolicy, {
  SearchHistoryLRUCache,
} from "@/application/policies/searchHistory.policy";
import { SEARCH_HISTORY_STORAGE_KEY } from "@/constants/localStorage";

class SearchHistoryRepoImpl implements SearchHistoryRepo {
  private cache: SearchHistoryLRUCache;
  private readonly STORAGE_KEY = SEARCH_HISTORY_STORAGE_KEY;

  constructor() {
    this.cache = searchHistoryPolicy.loadCache(
      myLocalStorage.get<unknown>(this.STORAGE_KEY)
    );
  }

  private persist = () => {
    myLocalStorage.set(
      this.STORAGE_KEY,
      searchHistoryPolicy.toArray(this.cache)
    );
  };

  toArray = () => {
    return searchHistoryPolicy.toArray(this.cache);
  };

  set = (item: SearchHistoryItem) => {
    searchHistoryPolicy.set(this.cache, item);
    this.persist();
  };

  remove = (item: SearchHistoryItem) => {
    const removed = searchHistoryPolicy.remove(this.cache, item);
    if (removed) {
      this.persist();
    }
    return removed;
  };

  clear = () => {
    searchHistoryPolicy.clear(this.cache);
    myLocalStorage.remove(this.STORAGE_KEY);
  };
}

export const createSearchHistoryRepo = (): SearchHistoryRepo => {
  return new SearchHistoryRepoImpl();
};
