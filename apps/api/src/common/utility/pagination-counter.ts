import { PaginationDto, PaginationResultDto } from '../dto';

export const getPaginationMeta = (
  { pageIndex, pageSize }: PaginationDto,
  { totalItems, itemsOnPage }: { totalItems: number; itemsOnPage: number }
): PaginationResultDto => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = pageIndex;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return {
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    itemsOnPage,
    isFirstPage,
    isLastPage,
  };
};
