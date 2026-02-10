import BookSearchBar from "@/components/books/BookSearchBar";
import BookPageTemplate from "./BookPageTemplate";
import { Pagination } from "@/components/ui/pagination";
import { SearchBooksControllerProvider } from "@/interfaces/controller/useSearchBooksController";
import BookListSearched from "@/components/books/BookListSearched";

export default function BooksPage() {
  return (
    <BookPageTemplate
      Provider={SearchBooksControllerProvider}
      title={"도서 검색"}
      searchbar={<BookSearchBar />}
      bookList={<BookListSearched />}
      pagination={<Pagination />}
    />
  );
}
