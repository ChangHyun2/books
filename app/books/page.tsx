import SearchBook from "@/components/books/SearchBook";

export default function BooksPage() {
  return (
    <main className="w-full mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">도서 검색</h1>
      <SearchBook />
    </main>
  );
}
