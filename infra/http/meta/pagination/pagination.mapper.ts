import { Pagination } from "@/models/meta/pagination.model";
import { PaginationMetaDto } from "./pagination.dto";

export const dtoToPagination = (
  dto: PaginationMetaDto & {
    page: number;
    size: number;
  }
): Pagination => {
  return {
    page: dto.page,
    perPage: dto.size,
    totalCount: dto.total_count,
    pageableCount: dto.pageable_count,
    isEnd: dto.is_end,
  };
};
