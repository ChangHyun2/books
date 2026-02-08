"use client";

import { useSearchBooksController } from "@/interfaces/controller/useSearchBooksController";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { useState } from "react";

function buildPaginationItems(params: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}) {
  const { currentPage, totalPages, siblingCount = 1 } = params;
  if (totalPages <= 0) return [];

  const clamp = (n: number) => Math.max(1, Math.min(totalPages, n));
  const current = clamp(currentPage);

  const pages = new Set<number>([1, totalPages, current]);
  for (let i = 1; i <= siblingCount; i++) {
    pages.add(clamp(current - i));
    pages.add(clamp(current + i));
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev !== 0 && p - prev > 1) items.push("ellipsis");
    items.push(p);
    prev = p;
  }
  return items;
}

export default function BookPagination() {
  const { searchBooksQuery, submit } = useSearchBooksController();
  const [page, setPage] = useState(1);
  const { totalCount } = searchBooksQuery.data ?? { totalCount: 0 };
  const totalPages = Math.max(1, Math.ceil(totalCount / 10));

  const items = buildPaginationItems({ currentPage: page, totalPages });
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const onPageChange = (page: number) => {
    setPage(page);
    submit({ page });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!canPrev}
            className={!canPrev ? "pointer-events-none opacity-50" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (!canPrev) return;
              onPageChange(page - 1);
            }}
          />
        </PaginationItem>
        {items.map((item, idx) => (
          <PaginationItem key={`${item}-${idx}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={item === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(item);
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={!canNext}
            className={!canNext ? "pointer-events-none opacity-50" : undefined}
            onClick={(e) => {
              e.preventDefault();
              if (!canNext) return;
              onPageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
