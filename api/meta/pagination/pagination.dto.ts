export type PaginationMetaDto = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type PaginationDto = PaginationMetaDto & {
  page: number;
  size: number;
};
