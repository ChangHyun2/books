export const getTotalPages = (totalItems: number, perPage: number) => {
  return Math.max(1, Math.ceil(totalItems / perPage));
};
