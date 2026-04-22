import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  total: number;
  limit: number;
}

export function Pagination({ currentPage, hasNext, hasPrev, onPageChange, total, limit }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="pagination">
      <p className="pagination-info">
        Showing <strong>{start}–{end}</strong> of <strong>{total}</strong> issues
      </p>
      <div className="pagination-controls">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          ← Prev
        </Button>

        <div className="pagination-pages">
          {pages.reduce<React.ReactNode[]>((acc, page, i) => {
            if (i > 0 && page - (pages[i - 1] as number) > 1) {
              acc.push(<span key={`ellipsis-${page}`} className="pagination-ellipsis">…</span>);
            }
            acc.push(
              <button
                key={page}
                className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
            return acc;
          }, [])}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
