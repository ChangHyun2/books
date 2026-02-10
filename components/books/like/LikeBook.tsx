import { Book } from "@/domain/books/book.model";
import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { useBooksLikedController } from "@/interfaces/controller/useBooksLikedController";
import { useLikedBooksStore } from "@/interfaces/stores/useLikedBooksStore";

export default function LikeBook({
  book,
  size = "sm",
}: {
  book: Book;
  size: "sm" | "md";
}) {
  const { likeBook, unlikeBook } = useBooksLikedController();
  const isLiked = useLikedBooksStore((state) => state.likedBookSet);

  const handleLike = () => {
    if (isLiked.has(book.id)) {
      unlikeBook(book);
    } else {
      likeBook(book);
    }
  };

  const svgSize = size === "sm" ? 16 : 20;

  return (
    <Button
      type="button"
      variant="link"
      className="text-destructive"
      size={size === "sm" ? "iconSm" : "icon"}
      onClick={handleLike}
    >
      <Heart
        className={isLiked.has(book.id) ? "fill-current" : "fill-none"}
        style={{ width: svgSize, height: svgSize }}
      />
    </Button>
  );
}
