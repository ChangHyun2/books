import type { Book } from "@/domain/books/book.model";
import { Skeleton } from "../ui/skeleton";
import LikeBook from "./like/LikeBook";

export default function BookDetail({ book }: { book: Book }) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-[280px] w-[210px] object-cover"
          />
        ) : (
          <Skeleton className="h-[280px] w-[210px]" />
        )}
        <div className="absolute top-1 right-1">
          <LikeBook book={book} size="md" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex gap-2 items-center">
          <p className="text-base font-semibold">{book.title}</p>
          <p className="text-sm text-muted-foreground">
            {book.authors.join(", ")} · {book.publisher}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{book.description}</p>
      </div>
    </div>
  );
}
