import BookList from "@/components/books/BookList";
import BookPagination from "@/components/books/BookPagination";
import BookSearchBar from "@/components/books/BookSearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBooksControllerProvider } from "@/interfaces/controller/useSearchBooksController";

export default function BooksPage() {
  return (
    <div className="mx-auto h-full min-h-0 flex flex-col overflow-hidden">
      <h1 className="text-xl font-semibold mb-4">도서 검색</h1>
      <SearchBooksControllerProvider>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="mb-4 ml-[1px]">
            <BookSearchBar />
          </div>
          <ScrollArea className="flex-1 min-h-0 pr-3">
            <BookList />
          </ScrollArea>
          <div className="pt-4">
            <BookPagination />
          </div>
        </div>
      </SearchBooksControllerProvider>
    </div>
  );
}
