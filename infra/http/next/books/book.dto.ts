export type BookDto = {
  title: string;
  contents: string;
  url: string;
  isbn: string; // "ISBN10 ISBN13" 형태 가능
  datetime: string; // ISO 8601
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};
