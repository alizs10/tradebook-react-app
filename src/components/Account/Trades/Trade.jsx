import React, { Fragment, useEffect, useRef, useState } from 'react';
import listenForOutsideClicks from '../../Services/listenForOutsideClick';
import moment from 'moment';
import Dropdown from './Dropdown';

const Trade = ({ setDoUserWantTradeDetails, setDoUserNeedEditTradeWindow, trade, index, setTrade, handleDelTrade }) => {

    const [showDropDownBtn, setShowDropDownBtn] = useState(false);
    const toggleDropDownBtn = () => setShowDropDownBtn(!showDropDownBtn);

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
            <tr className="text-xxs lg:text-base font-light mt-2 py-2 text-slate-300">
                <td className="py-4 pr-1">{index}</td>
                <td className="py-4">{moment(trade.trade_date, 'YYYY-jM-jD').format('YYYY/MM/DD')}</td>
                <td className="py-4">{trade.pair_name}</td>
                <td className={`py-4 hidden sm:block ${trade.contract_type == 0 ? "text-emerald-400" : "text-red-400"}`}>{trade.contract_type === 0 ? 'Long' : 'Short'}</td>
                <td className="py-4" style={{ direction: "ltr" }}>
                    <span className={trade.pnl > 0 ? '' : ' hidden'}>
                        <i className={`fa-regular fa-caret-up text-emerald-400 text-lg mr-1`}></i>
                    </span>
                    <span className={trade.pnl > 0 ? ' hidden' : ''}>
                        <i className={`fa-regular fa-caret-down text-red-400 text-lg mr-1`}></i>
                    </span>
                    <span>{`${trade.pnl} %`}</span>
                </td>
                <td className="relative">
                    <button onClick={toggleDropDownBtn}
                        className="py-1 px-2 text-xxs lg:text-base lg:px-4 lg:py-2 rounded-lg bg-slate-900"
                    >
                        <span>عملیات</span>
                        <i className="fa-light fa-angle-down mr-1"></i>
                    </button>
                    {showDropDownBtn && (
                        <Dropdown toggleDropDownBtn={toggleDropDownBtn} trade_id={trade.id} account_id={trade.account_id} handleDelTrade={handleDelTrade} handleOpenEditTradeWindow={handleOpenEditTradeWindow} handleOpenTradeDetailsWindow={handleOpenTradeDetailsWindow} />
                    )}

                </td>
            </tr>
        </Fragment>
    );
}

export default Trade;