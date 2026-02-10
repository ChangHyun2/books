import { SearchHistoryItem } from "@/application/ports/searchHistory.repo";
import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";
import { KeyboardEventHandler, MouseEventHandler, useRef } from "react";
import handleError from "@/utils/handleError";
import { Trash2 } from "lucide-react";
import useSearchHistoryStore from "@/interfaces/stores/useSearchHistoryStore";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

export default function BookSearchHistory({
  onSelectItem,
}: {
  onSelectItem: (item: SearchHistoryItem) => void;
}) {
  const { historyItems } = useSearchHistoryStore();
  if (historyItems.length === 0) return null;

  return (
    <Card className="py-1">
      <ul className="flex flex-col gap-2">
        {historyItems.map((item) => (
          <li key={item.value}>
            <HistoryItem
              key={item.value}
              item={item}
              onSelectItem={onSelectItem}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HistoryItem({
  item,
  onSelectItem,
}: {
  item: SearchHistoryItem;
  onSelectItem: (item: SearchHistoryItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { removeHistoryItem, submit } = useSearchBooksController();

  const deleteHistoryItem: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    try {
      removeHistoryItem(item);
    } catch (error) {
      window.alert(handleError(error));
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    submit(item);
    onSelectItem(item);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const items = Array.from(
      e.currentTarget
        .closest("ul")
        ?.querySelectorAll<HTMLElement>("[data-history-item]") ?? []
    );

    const i = items.indexOf(e.currentTarget);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[Math.min(i + 1, items.length - 1)]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      items[Math.max(i - 1, 0)]?.focus();
      // i === 0이면 inputRef.current?.focus() 같은 식으로 입력으로 복귀도 가능
    }
    if (e.key === "Enter") {
      e.preventDefault();
      submit(item);
      onSelectItem(item);
    }
  };

  return (
    <div
      ref={ref}
      data-history-item
      className="flex items-center justify-between gap-2 hover:bg-accent px-3 py-1"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="text-sm">{item.value}</div>
      <Button
        type="button"
        className="hover:bg-destructive"
        onClick={deleteHistoryItem}
        variant="ghost"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
