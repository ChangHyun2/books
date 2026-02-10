"use client";

import BookSearchBarFilter from "./BookSearchBarFilter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { DetailSearchPayload } from "./BookSearchBarFilter";
import {
  KeyboardEventHandler,
  ChangeEventHandler,
  SubmitEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";
import BookSearchHistory from "./BookSearchHistory";
import { cn } from "@/lib/utils";
import { SearchHistoryItem } from "@/application/ports/searchHistory.repo";

export default function BookSearchBar() {
  const { submit } = useSearchBooksController();
  const [searchValue, setSearchValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openHistory = () => {
    setIsHistoryOpen(true);
  };

  const closeHistory = () => {
    setIsHistoryOpen(false);
  };

  const handleSubmitAll: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submit({ type: undefined, value: searchValue });
    setSearchValue("");
  };

  const handleKeyDownForm: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === "Escape") {
      closeHistory();
      inputRef.current?.focus();
    }
  };

  const handleSubmitDetail = (payload: DetailSearchPayload) => {
    setSearchValue(payload.value);
    submit({ type: payload.type, value: payload.value });
  };

  const handleChangeSearchValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value.trim());
    openHistory();
  };

  const handleFocusSearchValue = () => {
    openHistory();
  };

  const handleKeyDownSearchValue: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key !== "ArrowDown") return;
    openHistory();
    e.preventDefault();
    const $searchBooksForm = document.getElementById("search-books-form");
    if (!$searchBooksForm) return;
    const $historyItems = $searchBooksForm.querySelectorAll<HTMLElement>(
      "[data-history-item]"
    );
    if ($historyItems.length === 0) return;
    $historyItems[0].focus();
  };

  const handleSelectHistoryItem = (item: SearchHistoryItem) => {
    submit({ type: item.type, value: item.value });
    setSearchValue(item.value);
    inputRef.current?.focus();
    closeHistory();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("#search-books-form") &&
        e.target !== e.currentTarget
      ) {
        return;
      }

      closeHistory();
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form
      id="search-books-form"
      className="flex gap-2"
      onSubmit={handleSubmitAll}
      onKeyDown={handleKeyDownForm}
      onPointerDownCapture={(e) => {
        if (e.target === e.currentTarget) {
          closeHistory();
        }
      }}
    >
      <InputGroup className="max-w-xs relative">
        <InputGroupInput
          ref={inputRef}
          placeholder="검색어를 입력해주세요."
          value={searchValue}
          onChange={handleChangeSearchValue}
          onFocus={handleFocusSearchValue}
          onKeyDown={handleKeyDownSearchValue}
          onPointerDown={openHistory}
        />
        <InputGroupAddon align="inline-end">
          <button type="submit" aria-label="검색">
            <Search />
          </button>
        </InputGroupAddon>
        <div
          className={cn(
            "absolute top-full translate-y-2 left-0 z-1 w-full",
            isHistoryOpen ? "h-auto" : "h-0 overflow-hidden"
          )}
        >
          <BookSearchHistory onSelectItem={handleSelectHistoryItem} />
        </div>
      </InputGroup>
      <BookSearchBarFilter
        onSubmit={handleSubmitDetail}
        onClickPopOverTrigger={closeHistory}
      />
    </form>
  );
}
