import React from 'react';
import { ClipLoader } from 'react-spinners';

const HomeStat = ({ stat, loading }) => {
    return (
        <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

            <span className="col-span-1">
                <i className="fa-light fa-rectangle-history text-2xl lg:text-4xl mr-2 text-gray-400"></i>
            </span>

            <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                <span className="text-base lg:text-xl font-bold text-blue-600">
                    {loading ? (
                        <ClipLoader color={'#fff'} size={15} />
                    ) : (stat.value)}
                </span>
                <span className="text-xs lg:text-base font-light text-slate-300">{stat.name}</span>
            </span>

        </div>
    );
}

export default HomeStat;