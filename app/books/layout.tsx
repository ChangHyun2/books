import { BooksLikedControllerProvider } from "@/interfaces/controller/useBooksLikedController";

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BooksLikedControllerProvider>{children}</BooksLikedControllerProvider>
  );
}
