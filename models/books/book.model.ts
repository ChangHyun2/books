export type Book = {
  id: string; // isbn
  publisher: string;
  coverUrl: string;
  purchaseUrl: string;
  title: string;
  authors: string[];
  description: string;
  price: number;
  salePrice: number;
};
