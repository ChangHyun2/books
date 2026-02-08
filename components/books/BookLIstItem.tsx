import { useState } from "react";
import type { Book } from "@/domain/books/book.model";
import BookListItemSummary from "./BookLIstItemSummary";
import BookListItemDetail from "./BookListItemDetail";
import BookListItemActions from "./BookLIstItemActions";

export default function BookListItem({ book }: { book: Book }) {
  const [isExpanded, setisExpanded] = useState(false);

  return (
    <div className="flex items-stretch justify-between gap-4">
      <div className="flex-1 flex items-center">
        {isExpanded ? (
          <BookListItemDetail book={book} />
        ) : (
          <BookListItemSummary book={book} />
        )}
      </div>
      <div>
        <BookListItemActions
          isExpanded={isExpanded}
          expand={() => setisExpanded((prev) => !prev)}
          book={book}
        />
      </div>
    </div>
  );
}
