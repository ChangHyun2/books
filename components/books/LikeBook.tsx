import { Book } from "@/domain/books/book.model";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useBooksLikedController } from "@/interfaces/controller/useBooksLikedController";

export default function LikeBook({
  book,
  size = "sm",
}: {
  book: Book;
  size: "sm" | "md";
}) {
  const { usecase, likedBooksRepo } = useBooksLikedController();
  const [isLiked, setIsLiked] = useState(() => likedBooksRepo.isLiked(book));

  const handleLike = () => {
    const isSuccess = isLiked
      ? usecase.unlikeBook(book)
      : usecase.likeBook(book);
    if (isSuccess) {
      setIsLiked(!isLiked);
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
        className={isLiked ? "fill-current" : "fill-none"}
        style={{ width: svgSize, height: svgSize }}
      />
    </Button>
  );
}
