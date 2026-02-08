import BookList from "@/components/books/BookLIst";
import BookSearchBar from "@/components/books/BookSearchBar";
import { SearchBooksControllerProvider } from "@/interfaces/controller/useSearchBooksController";

export default function BooksPage() {
  return (
    <main className="w-full mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">도서 검색</h1>
      <SearchBooksControllerProvider>
        <div>
          <div className="mb-4">
            <BookSearchBar />
          </div>
          <div className="h-[400px]">
            <BookList />
          </div>
        </div>
      </SearchBooksControllerProvider>
    </main>
  );
}
