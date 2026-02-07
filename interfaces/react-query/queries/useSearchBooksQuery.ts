import { useQuery } from "@tanstack/react-query";
import { booksKeys } from "../keys";
import { SearchBooksUsecase } from "@/application/usecases/books/search-books";
import { SearchBooksValidInput } from "@/application/ports/searchBooks.port";

export default function useSearchBooksQuery(params: {
  usecase: SearchBooksUsecase;
  searchBooksValidInput?: SearchBooksValidInput;
}) {
  const { usecase, searchBooksValidInput } = params;

  return useQuery({
    queryKey: booksKeys.search(
      searchBooksValidInput ?? {
        value: "",
        type: "title",
        page: 1,
        perPage: 10,
      }
    ),
    queryFn: () => {
      if (!searchBooksValidInput) {
        throw new Error("Search books valid input is required");
      }
      usecase.execute(searchBooksValidInput);
    },
    enabled: !!searchBooksValidInput,
  });
}
