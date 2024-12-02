import React, {Fragment} from 'react';
import '../styles/Pagination.css';

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalCourses / coursesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const getPageNumbers = () => {
        const maxPageNumbersToShow = 5;
        const half = Math.floor(maxPageNumbersToShow / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(currentPage + half, totalPages);

        if (currentPage <= half) {
            start = 1;
            end = maxPageNumbersToShow;
        } else if (currentPage + half >= totalPages) {
            start = totalPages - maxPageNumbersToShow + 1;
            end = totalPages;
        }

        return pageNumbers.slice(start - 1, end);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePrevious}>
                    <span className="page-link">&#8592;</span>
                </li>
                {currentPage > 3 && (
                    <Fragment>
                        <li className="page-item" onClick={() => paginate(1)}>
                            <span className="page-link">1</span>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    </Fragment>
                )}
                {getPageNumbers().map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} onClick={() => paginate(number)}>
                        <span className="page-link">{number}</span>
                    </li>
                ))}
                {currentPage < totalPages - 2 && (
                    <Fragment>
                        <li className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                        <li className="page-item" onClick={() => paginate(totalPages)}>
                            <span className="page-link">{totalPages}</span>
                        </li>
                    </Fragment>
                )}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={handleNext}>
                    <span className="page-link">&#8594;</span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
