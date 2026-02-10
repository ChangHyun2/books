import type { Book } from "@/domain/books/book.model";
import { toBookItem } from "@/interfaces/presenter/fromDomain/book.presenter";
import { Skeleton } from "../ui/skeleton";
import LikeBook from "./like/LikeBook";

export default function BookSummary({ book }: { book: Book }) {
  const bookItem = toBookItem(book);
  const { price } = bookItem;

  return (
    <div className="w-full flex items-center gap-4 justify-between">
      <div className="relative">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-[68px] w-[48px] flex-none rounded object-cover"
          />
        ) : (
          <Skeleton className="h-[68px] w-[48px]" />
        )}
        <div className="absolute top-0 right-0">
          <LikeBook book={book} size="sm" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <div className="min-w-0 flex gap-3 items-center">
          <p className="truncate text-sm font-medium">{book.title}</p>
          <p className="truncate text-xs text-muted-foreground">
            {book.authors.join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-semibold">{price}</p>
        </div>
      </div>
    </div>
  );
}
