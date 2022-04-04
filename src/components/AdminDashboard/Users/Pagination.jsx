import React from 'react';

const Pagination = ({ currentPage, pages, setCurrentPage, total, startIndex, endIndex }) => {

    const handlePageBack = () => {
        if (currentPage === 1) {
            setCurrentPage(pages)
            return
        }

        setCurrentPage(currentPage - 1)
    }

    const handlePageForward = () => {
        if (currentPage === pages) {
            setCurrentPage(1)
            return
        }

        setCurrentPage(currentPage + 1)
    }
    return (
        <div className="border-t-2 border-gray-100 flex justify-between pt-2 items-center gap-4">
            <span className="text-xs text-slate-600 dark:text-slate-400 mr-2">
                نمایش {startIndex + 1} تا {endIndex} از {total} مورد
            </span>
            <div className="flex items-center gap-4 ml-2">
                <button className="rounded-lg px-2 py-1 bg-slate-200 dark:bg-slate-900 dark:text-slate-400" onClick={() => handlePageBack()}>
                    <i className="fa-light fa-angle-right"></i>
                </button>

                <span className="text-xxs dark:text-slate-400">
                    {currentPage} از {pages}
                </span>

                <button className="rounded-lg px-2 py-1 bg-slate-200 dark:bg-slate-900 dark:text-slate-400" onClick={() => handlePageForward()}>
                    <i className="fa-light fa-angle-left"></i>
                </button>
            </div>
        </div>
    );
}

export default Pagination;