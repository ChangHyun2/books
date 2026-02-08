import { Book } from "@/domain/books/book.model";
import { Separator } from "@/components/ui/separator";
import BookListItem from "./BookLIstItem";

export default function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        검색된 결과가 없습니다.
      </div>
    );
  }

  return (
    <div>
      <Separator className="mb-2" />
      {books.map((book, index) => (
        <div key={book.id}>
          <BookListItem book={book} />
          {index !== books.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
      <Separator className="mt-2" />
    </div>
  );
}
