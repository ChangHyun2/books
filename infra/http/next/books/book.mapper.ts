import { Book } from "@/domain/books/book.model";
import { BookDto } from "./book.dto";

// server dto => domain model
export const dtoToBook = (bookDto: BookDto): Book => {
  const [bn1, bn2] = bookDto.isbn.split(" ");

  let isbn10;
  let isbn13;

  if (bn1.length === 10) {
    isbn10 = bn1;
    if (bn2.length === 13) {
      isbn13 = bn2;
    }
  } else if (bn1.length === 13) {
    isbn13 = bn1;
    if (bn2.length === 10) {
      isbn10 = bn2;
    }
  }

  const id = bookDto.url;

  return {
    id,
    isbn10,
    isbn13,
    coverUrl: bookDto.thumbnail,
    title: bookDto.title,
    authors: bookDto.authors,
    publisher: bookDto.publisher,
    description: bookDto.contents,
    price: bookDto.price,
    salePrice: bookDto.sale_price,
    purchaseUrl: bookDto.url,
  };
};
