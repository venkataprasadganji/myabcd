import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div className="pagination-controls">
      <button disabled={currentPage === 1} onClick={onPrevious}>← Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button disabled={currentPage === totalPages} onClick={onNext}>Next →</button>
    </div>
  );
};

export default Pagination;
