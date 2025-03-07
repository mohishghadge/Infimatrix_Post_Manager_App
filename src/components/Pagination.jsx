import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex items-center justify-center my-8 space-x-4'>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-violet-500 hover:bg-violet-100'}`}
      >
        ◀
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 rounded ${currentPage === page ? 'bg-violet-500 text-white' : 'text-violet-500 hover:bg-violet-100'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-violet-500 hover:bg-violet-100'}`}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
