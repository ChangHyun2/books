import { Book } from "@/domain/books/book.model";

export const toBookItem = (book: Book) => {
  const {
    id,
    title,
    authors,
    publisher,
    price,
    salePrice,
    coverUrl,
    purchaseUrl,
    description,
  } = book;

  const priceWon = (price: number) => `${price}원`;

  const bookItem = {
    id,
    title,
    authors,
    publisher,
    price: priceWon(price),
    salePrice: priceWon(salePrice),
    coverUrl,
    purchaseUrl,
    description,
  };

  return bookItem;
};
