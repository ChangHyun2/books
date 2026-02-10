import { BooksLikedControllerProvider } from "@/interfaces/controller/useBooksLikedController";
import BookPageTemplate from "../BookPageTemplate";
import BookListLiked from "@/components/books/like/BookListLiked";

export default function LikedBooksPage() {
  return (
    <BookPageTemplate
      title={"내가 찜한 책"}
      bookList={<BookListLiked />}
      Provider={BooksLikedControllerProvider}
    />
  );
}
