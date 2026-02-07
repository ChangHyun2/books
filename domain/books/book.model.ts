export type Book = {
  id: string;
  publisher: string;
  coverUrl: string;
  purchaseUrl: string;
  title: string;
  authors: string[];
  description: string;
  price: number;
  salePrice: number;
  isbn10?: string;
  isbn13?: string;
};
