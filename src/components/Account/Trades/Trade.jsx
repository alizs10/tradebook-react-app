import React, { Fragment, useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../Services/listenForOutsideClick';
import moment from 'moment';

const Trade = ({ setDoUserWantTradeDetails, setDoUserNeedEditTradeWindow, trade, index, setTrade, handleDelTrade }) => {

    const dropdownBtnRef = useRef(null);
    const [listening, setListening] = useState(false);

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

    useEffect(listenForOutsideClicks(listening, setListening, dropdownBtnRef, setShowDropDownBtn, setTrade));

    const handleOpenTradeDetailsWindow = () => {
        setTrade(trade)
        setDoUserWantTradeDetails(true)
        toggleDropDownBtn()
    }

    const handleOpenEditTradeWindow = () => {
        setTrade(trade)
        setDoUserNeedEditTradeWindow(true)
        toggleDropDownBtn()
    }
    return (
        <Fragment>
            <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
                <td className="py-4 pr-1">{index + 1}</td>
                <td className="py-4">{moment(trade.trade_date, "YYYY-MM-DD").format('ll')}</td>
                <td className="py-4">{trade.pair_name}</td>
                <td className="py-4 hidden sm:block">{trade.contract_type === 0 ? 'Long' : 'Short'}</td>
                <td className="py-4" style={{ direction: "ltr" }}>
                    <span className={trade.pnl > 0 ? '' : ' hidden'}>
                        <i className={`fa-regular fa-caret-up text-emerald-400 text-lg mr-1`}></i>
                    </span>
                    <span className={trade.pnl > 0 ? ' hidden' : ''}>
                        <i className={`fa-regular fa-caret-down text-red-400 text-lg mr-1`}></i>
                    </span>
                    <span>{`${trade.pnl} %`}</span>
                </td>
                <td className="relative" ref={dropdownBtnRef}>
                    <button onClick={toggleDropDownBtn}
                        className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-200 dark:bg-slate-900"
                    >
                        <span>عملیات</span>
                        <i className="fa-light fa-angle-down mr-1"></i>
                    </button>
                    {!showDropDownBtn ? null : (
                        <ul
                            className="absolute top-12 -right-10 lg:top-14 lg:right-auto z-10 drop-shadow-lg bg-slate-100 dark:bg-slate-800 rounded-lg w-24 lg:w-36 overflow-hidden">
                            <li>
                                <button onClick={() => handleOpenTradeDetailsWindow()}
                                    className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                    <i className="fa-light fa-memo-circle-info text-xs lg:text-base mx-2"></i>
                                    جزییات</button>
                            </li>
                            <li>
                                <button onClick={() => handleOpenEditTradeWindow()}
                                    className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                    <i className="fa-light fa-pen-to-square text-xs lg:text-base mx-2"></i>
                                    ویرایش</button>
                            </li>
                            <li>
                                <button onClick={() => handleDelTrade(trade.account_id, trade.id)}
                                    className="w-full text-right text-xxxs lg:text-xs py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition ease-out duration-300">
                                    <i className="fa-light fa-trash text-xs lg:text-base mx-2"></i>
                                    حذف</button>
                            </li>

                        </ul>
                    )}

                </td>
            </tr>
        </Fragment>
    );
}

export default Trade;