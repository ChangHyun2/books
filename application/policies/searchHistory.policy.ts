import { LRUCache } from "lru-cache";
import type { SearchHistoryItem } from "../ports/searchHistory.repo";
import { SearchBooksValidInput } from "../ports/searchBooks.port";

// 전체 검색만 캐싱
export type SearchHistoryKey =
  `${SearchBooksValidInput["type"]}:${SearchBooksValidInput["value"]}`;
export type SearchHistoryLRUCache = LRUCache<
  SearchHistoryKey,
  SearchHistoryItem
>;

export const MAX_SEARCH_HISTORY_COUNT = 8;

const getSearchHistoryKey = (item: SearchHistoryItem): SearchHistoryKey => {
  return `${item.type}:${item.value.trim()}`;
};

const isValidType = (type: unknown): type is SearchHistoryItem["type"] => {
  return (
    type === undefined ||
    type === "title" ||
    type === "author" ||
    type === "publisher"
  );
};

// MRU => LRU 순서로 반환
const toArray = (cache: SearchHistoryLRUCache): SearchHistoryItem[] => {
  return Array.from(cache.values());
};

const set = (cache: SearchHistoryLRUCache, item: SearchHistoryItem) => {
  // 전체 검색인 경우에만 히스토리 목록에 추가
  if (item.type !== undefined) return;
  cache.set(getSearchHistoryKey(item), item);
};

const remove = (
  cache: SearchHistoryLRUCache,
  item: SearchHistoryItem
): boolean => {
  const key = getSearchHistoryKey(item);

  if (cache.has(key)) {
    cache.delete(key);
    return true;
  }

  return false;
};

const clear = (cache: SearchHistoryLRUCache) => {
  cache.clear();
};

// 캐시 toArray는 MRU => LRU 순서로 반환하므로, 복원 시 reverse 필요
const loadCache = (raw: unknown): SearchHistoryLRUCache => {
  const lruCache = new LRUCache<SearchHistoryKey, SearchHistoryItem>({
    max: MAX_SEARCH_HISTORY_COUNT,
  });

  if (!Array.isArray(raw)) return lruCache;

  for (const r of raw.reverse()) {
    if (!r || typeof r !== "object") continue;
    const obj = r as Record<string, unknown>;
    const type = obj.type;
    const value = obj.value;
    if (!isValidType(type)) continue;
    if (typeof value !== "string") continue;
    set(lruCache, { type, value });
  }

  return lruCache;
};

const searchHistoryPolicy = {
  loadCache,
  set,
  remove,
  clear,
  toArray,
} as const;

export default searchHistoryPolicy;
