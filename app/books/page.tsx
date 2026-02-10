import BookSearchBar from "@/components/books/search/BookSearchBar";
import BookPageTemplate from "./BookPageTemplate";
import { SearchBooksControllerProvider } from "@/interfaces/controller/useSearchBooksController";
import BookListSearched from "@/components/books/search/BookListSearched";
import SearchBookPagination from "@/components/books/search/SearchBookPagination";

export default function BooksPage() {
  return (
    <BookPageTemplate
      Provider={SearchBooksControllerProvider}
      title={"도서 검색"}
      searchbar={<BookSearchBar />}
      bookList={<BookListSearched />}
      pagination={<SearchBookPagination />}
    />
  );
}
