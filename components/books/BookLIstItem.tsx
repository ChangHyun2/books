import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Book } from "@/domain/books/book.model";
import BookListItemSummary from "./BookLIstItemSummary";
import BookListItemDetail from "./BookListItemDetail";
import { Button } from "@/components/ui/button";
import { toBookItem } from "@/interfaces/presenter/fromDomain/book.presenter";

export default function BookListItem({ book }: { book: Book }) {
  const [isDetail, setIsDetail] = useState(false);
  const bookItem = toBookItem(book);
  const { price, salePrice } = bookItem;

  const purchaseButton = (
    <Button asChild className="w-full">
      <a href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
        구매하기
      </a>
    </Button>
  );

  const actions = (
    <div className="h-full py-6 flex flex-col justify-between w-[240px]">
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="flex-1">{isDetail ? <div></div> : purchaseButton}</div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDetail((prev) => !prev)}
          className="flex-1"
        >
          상세보기
          <ChevronDown
            className={`transition-transform ${
              isDetail ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </div>
      {isDetail && (
        <div className="flex-1 flex flex-col items-end justify-end">
          <div className="text-right mb-4">
            <p className="text-xs text-muted-foreground mb-1">원가 {price}</p>
            <p className="text-base font-semibold">할인가 {salePrice}</p>
          </div>
          <div className="w-full">{purchaseButton}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-stretch justify-between gap-4">
      <div className="flex-1 flex items-center">
        {isDetail ? (
          <BookListItemDetail book={book} />
        ) : (
          <BookListItemSummary book={book} />
        )}
      </div>
      <div>{actions}</div>
    </div>
  );
}
