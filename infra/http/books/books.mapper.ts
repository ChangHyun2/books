import { BookDto } from "./books.dto";
import { Book } from "@/models/books/book.model";

export const dtoToBook = (bookDto: BookDto): Book => {
  return {
    coverUrl: bookDto.thumbnail,
    title: bookDto.title,
    authors: bookDto.authors,
    publisher: bookDto.publisher,
    description: bookDto.contents,
    price: bookDto.price,
    salePrice: bookDto.sale_price,
    id: bookDto.isbn,
    purchaseUrl: bookDto.url,
  };
};
