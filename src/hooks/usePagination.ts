import { useState, useMemo } from 'react';

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
}

export function usePagination<T>(items: T[], pageSize: number = 50) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      currentPage,
      totalPages,
      totalItems: items.length,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      pageSize,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, items.length),
    };
  }, [items, currentPage, pageSize]);

  const goToPage = (page: number) => {
    const totalPages = Math.ceil(items.length / pageSize);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  const resetPage = () => setCurrentPage(1);

  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    setCurrentPage,
  };
}
