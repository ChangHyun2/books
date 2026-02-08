import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Book } from "@/domain/books/book.model";

export default function BookListItemActions({
  isExpanded,
  expand,
  book,
}: {
  isExpanded: boolean;
  expand: () => void;
  book: Book;
}) {
  const { purchaseUrl, price, salePrice } = book;
  const purchaseButton = (
    <Button asChild className="w-full">
      <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
        구매하기
      </a>
    </Button>
  );

  return (
    <div className="h-full py-6 flex flex-col justify-between w-[240px]">
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="flex-1">
          {isExpanded ? <div></div> : purchaseButton}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={expand}
          className="flex-1"
        >
          상세보기
          <ChevronDown
            className={`transition-transform ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </div>
      {isExpanded && (
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
}
