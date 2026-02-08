import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
      console.log("searchBooksValidInput", searchBooksValidInput);
      if (!searchBooksValidInput) {
        throw new Error("Search books valid input is required");
      }
      return usecase.execute(searchBooksValidInput);
    },
    placeholderData: keepPreviousData,
    enabled: !!searchBooksValidInput,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
