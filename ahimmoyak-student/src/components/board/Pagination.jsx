import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex justify-center space-x-4">
            <button
                className="px-3 py-2 bg-gray-300 rounded"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                이전
            </button>
            <span>
        {currentPage} / {totalPages}
      </span>
            <button
                className="px-3 py-2 bg-gray-300 rounded"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
};

export default Pagination;
