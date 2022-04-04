import React from 'react';

const SearchTrade = ({ handleSearchInp }) => {
    return (
        <div className="col-span-6 md:col-span-8 grid grid-cols-8 backdrop-blur-lg bg-slate-900/70 rounded-lg">
            <input type="text" onChange={event => handleSearchInp(event)}
                className="h-full col-span-6 sm:col-span-7 bg-transparent text-lg px-2 focus:outline-none placeholder:text-slate-700"
                placeholder="کدوم جفت ارز؟" />
            <div className="flex justify-end items-center col-span-2 sm:col-span-1">
                <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500 ml-2 lg:ml-4"></i>
            </div>
        </div>

    );
}

export default SearchTrade;