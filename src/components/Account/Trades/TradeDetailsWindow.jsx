import React, { Fragment } from 'react';

import { motion } from 'framer-motion';

const TradeDetailsWindow = ({ setDoUserWantTradeDetails, trade, handleDelTrade, handleEditTrade }) => {




    return (

        <motion.div key="modal"
            initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-40 rounded-lg drop-shadow-lg bg-slate-600">
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">جزییات معامله</h2>

                    <button className="p-2 text-base" onClick={() => setDoUserWantTradeDetails(false)}>
                        <i className="fa-regular fa-xmark"></i>
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-900">
                    <div className="col-span-1 md:col-span-2 p-2 flex justify-between items-center">
                        <span className="flex gap-x-2  sm:justify-center items-center text-2xl md:text-5xl lg:text-6xl w-full text-slate-300">
                            <span>
                                <i className="fa-duotone fa-dollar-sign"></i>
                                {trade.profit}
                            </span>
                            <span className="mx-2">|</span>
                            <span>
                                <i className="fa-duotone fa-percent"></i>
                                {trade.pnl}
                            </span>
                        </span>

                        <span className={`text-6xl sm:text-7xl md:text-9xl sm:text-center sm:w-full${trade.pnl > 0 ? " text-emerald-400" : " text-red-400"}`}>
                            <i className={`fa-duotone fa-arrow-trend-${trade.pnl > 0 ? "up" : "down"}`}></i>
                        </span>



                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">تاریخ</span>
                        <span className="text-base">{trade.trade_date}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">جفت ارز</span>
                        <span className="text-base">{trade.pair_name}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">مارجین</span>
                        <span className="text-base">{`$ ${trade.margin}`}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">لوریج</span>
                        <span className="text-base">{`x ${trade.leverage}`}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">وضعیت</span>
                        <span className="text-base">{trade.status === 1 ? 'closed' : 'open'}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">نوع قرارداد</span>
                        <span className="text-base">{trade.contract_type === 0 ? 'Long' : 'Short'}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">نقطه ورود</span>
                        <span className="text-base">{trade.entry_price}</span>
                    </div>
                    <div className="col-span-1 rounded-lg bg-slate-400 flex flex-col gap-y-1 p-2">
                        <span className="text-xs pb-2 border-b-2 border-slate-700">نقطعه خروج</span>
                        <span className="text-base">{trade.exit_price}</span>
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-x-2">
                    <button className="px-4 py-2 rounded-lg text-xs bg-yellow-300 text-slate-900" onClick={() => handleEditTrade()}>
                        <i className="fa-regular fa-pen-to-square"></i>
                        <span className='mr-1'>ویرایش</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg text-xs bg-gray-300 text-slate-900" onClick={() => handleDelTrade(trade.account_id, trade.id)}>
                        <i className="fa-regular fa-trash"></i>
                        <span className='mr-1'>حذف</span>
                    </button>
                </div>

            </div>
        </motion.div>


    );
}

export default TradeDetailsWindow;