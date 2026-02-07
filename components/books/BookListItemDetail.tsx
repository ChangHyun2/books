import type { Book } from "@/domain/books/book.model";

export default function BookListItemDetail({ book }: { book: Book }) {
  return (
    <div className="flex gap-4">
      <img
        src={book.coverUrl}
        alt={book.title}
        className="h-[280px] w-[210px] object-cover"
      />
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
