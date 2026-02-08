import { useState } from "react";
import type { Book } from "@/domain/books/book.model";
import BookDetail from "./BookDetail";
import BookSummary from "./BookSummary";
import BookActions from "./BookActions";

export default function BookItem({ book }: { book: Book }) {
  const [isExpanded, setisExpanded] = useState(false);

  return (
    <div className="flex items-stretch justify-between gap-4">
      <div className="flex-1 flex items-center">
        {isExpanded ? <BookDetail book={book} /> : <BookSummary book={book} />}
      </div>
      <div>
        <BookActions
          isExpanded={isExpanded}
          expand={() => setisExpanded((prev) => !prev)}
          book={book}
        />
      </div>
    </div>
  );
}
