import { Book } from "@/domain/books/book.model";
import BookListItem from "./BookLIstItem";

export default function BookList({ books }: { books: Book[] }) {
  return (
    <div>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
}
