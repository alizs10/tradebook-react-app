import React, { Fragment } from 'react';

const Paginate = ({ currentPage, pages, setCurrentPage }) => {

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
        <Fragment>
            <div className="border-t-2 border-gray-100 flex justify-between pt-2 items-center gap-4 mx-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                    نمایش 1 تا 10 از 34 مورد
                </span>
                <div className="flex items-center gap-4">
                    <button className="rounded-lg text-lg bg-slate-200 dark:bg-slate-900 dark:text-slate-400 flex justify-center items-center p-2" onClick={() => handlePageBack()}>
                        <i className="fa-light fa-angle-right"></i>
                    </button>

                    <span className="text-xxs dark:text-slate-400">
                    {currentPage} از {pages}
                    </span>

                    <button className="rounded-lg text-lg bg-slate-200 dark:bg-slate-900 dark:text-slate-400 flex justify-center items-center p-2" onClick={() => handlePageForward()}>
                        <i className="fa-light fa-angle-left"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Paginate;