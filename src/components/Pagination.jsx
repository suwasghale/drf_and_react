const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, idx) => {
        const pageNum = idx + 1;

        if (
          pageNum === 1 ||
          pageNum === totalPages ||
          (pageNum >= page - 1 && pageNum <= page + 1)
        ) {
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        }

        if (pageNum === page - 2 || pageNum === page + 2) {
          return (
            <span key={pageNum} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
