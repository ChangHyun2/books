import { createLikeBookUsecase } from "@/application/usecases/books/likeBook";
import { Book } from "@/domain/books/book.model";
import { createBookLikesRepo } from "@/infra/storage/localStorage/likedBooks.repo";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

export default function LikeBook({
  book,
  size = "sm",
}: {
  book: Book;
  size: "sm" | "md";
}) {
  const [isLiked, setIsLiked] = useState(false);
  const likedBooksRepo = useMemo(() => createBookLikesRepo(), []);
  const { likeBook, unlikeBook } = useMemo(
    () => createLikeBookUsecase(likedBooksRepo),
    [likedBooksRepo]
  );

  const handleLike = () => {
    const isSuccess = isLiked ? unlikeBook(book) : likeBook(book);
    if (isSuccess) {
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    setIsLiked(likedBooksRepo.isLiked(book));
  }, [book, likedBooksRepo]);

  const svgSize = size === "sm" ? 16 : 20;

  return (
    <Button
      type="button"
      variant="link"
      className="text-destructive focus-visible:ring-0"
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
