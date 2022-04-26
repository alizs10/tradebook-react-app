
import React, { Fragment, useEffect, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getAllTrades } from '../../Redux/Action/Trades';
import { paginate } from '../../Services/Pagination';
import Trade from './Trade';
import TradeDetailsWindow from './TradeDetailsWindow';
import CreateTradeInputWindow from './CreateTradeInputWindow';
import EditTradeInputWindow from './EditTradeInputWindow';
import { getAccounts } from '../../Services/DataLoader';
import SearchTrade from './SearchTrades';
import Paginate from './Paginate';
import { DeleteTrade } from '../../Redux/Action/Trades';
import { confirm, notify } from '../../Services/alerts';
import { DestroyTrade } from '../../Services/TradesServices';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { isEmpty, isNull } from 'lodash';
import { setCryptoPairs, setForexPairs } from '../../Redux/Action/Pairs';
import UpdatePriceWindow from './UpdatePriceWindow';
import { CSVLink } from 'react-csv';
import DateRangePickerWindow from './DateRangePickerWindow';

import { AnimatePresence, motion } from 'framer-motion';

const Trades = () => {

    const [doUserNeedDateRangeWindow, setDoUserNeedDateRangeWindow] = useState(false);
    const [doUserNeedCreateTradeWindow, setDoUserNeedCreateTradeWindow] = useState(false);
    const [doUserNeedEditTradeWindow, setDoUserNeedEditTradeWindow] = useState(false);
    const [doUserWantTradeDetails, setDoUserWantTradeDetails] = useState(false);
    const [doUserNeedUpdatePriceWindow, setDoUserNeedUpdatePriceWindow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [trade, setTrade] = useState({});
    const blurConditions = doUserNeedCreateTradeWindow || doUserWantTradeDetails || doUserNeedUpdatePriceWindow || doUserNeedEditTradeWindow;

    const trades = useSelector(state => state.Trades);
    const account = useSelector(state => state.Account);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isUserSearching, setIsUserSearching] = useState(false);
    const [showArr, setShowArr] = useState(trades);
    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [accType, setAccType] = useState("");
    const [filterMode, setFilterMode] = useState("all");
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [csvData, setCsvData] = useState([])
    const [exportDate, setExportDate] = useState("")

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const { account_id } = useParams();

    useEffect(async () => {

        const { data } = await getAccounts();
        const accounts = data.accounts;
        if (trades.length === 0) {
            const matched_accs = accounts.filter(acc => acc.id === parseInt(account_id))
            if (matched_accs.length !== 0) {
                dispatch(getAllTrades(account_id))
            } else {
                navigate('/panel/accounts');
                notify('این حساب وجود ندارد', 'error')
            }
        }

    }, [])

    useEffect(() => {
        if (isEmpty(account)) return;

        if (account.type == 0) {
            dispatch(setCryptoPairs())
            setAccType('crypto')
        } else {
            dispatch(setForexPairs())
            setAccType('forex')
        }


    }, [account])

    const handleCloseOpenWindow = () => {
        if (doUserWantTradeDetails) {
            setDoUserWantTradeDetails(false)
        } else if (doUserNeedCreateTradeWindow) {
            setDoUserNeedCreateTradeWindow(false)
        } else if (doUserNeedUpdatePriceWindow) {
            setDoUserNeedUpdatePriceWindow(false)
        } else {
            setDoUserNeedEditTradeWindow(false)
        }
    }

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setFilterMode("")
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = trades.filter(trade => trade.pair_name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            handleFiltringOnTrades('all')
        }


    }


    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(trades)


    }, [trades])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))

        const dateInstance = new Date();
        const now = dateInstance.getFullYear() + "-" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "-" +
            ("0" + dateInstance.getDate()).slice(-2) + "-" + ("0" + dateInstance.getHours()).slice(-2) + "-" + ("0" + dateInstance.getMinutes()).slice(-2) + "-" + ("0" + dateInstance.getSeconds()).slice(-2);
        setExportDate(now)

        if (showArr.length === 0) {
            setCsvData([
                { message: "no data" }
            ])
            return
        }
        createExportableCsvData(showArr)
    }, [showArr])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [currentPage])

    const createExportableCsvData = (dataArr) => {

        var exportableData = structuredClone(dataArr)

        exportableData.forEach(val => {
            delete val.id
            delete val.account_id
            val.contract_type = val.contract_type === 0 ? "buy" : "sell"
            val.status = val.status === 0 ? "open" : "closed"
            val.valume = JSON.parse(val.margin).valume
            val.margin = JSON.parse(val.margin).margin
            delete val.created_at
            delete val.deleted_at
            delete val.pair
            delete val.user_id
            delete val.updated_at
            delete val.pair_id
            return val
        })
        setCsvData(exportableData)

    }


    const handleDelTrade = (acc_id, trade_id) => {
        confirm('حذف ترید', 'آیا می خواهید ترید مورد نظر را حذف کنید؟.',
            async () => {
                const { status } = await DestroyTrade(acc_id, trade_id)

                if (status === 200) {
                    dispatch(DeleteTrade(trade_id))
                    if (doUserWantTradeDetails) {
                        setDoUserWantTradeDetails(false)
                    }
                    notify('ترید شما با موفقیت حذف شد', 'success');

                } else {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                }
            },
            function () {
                notify('درخواست شما لغو شد', 'warning');
            }
        )
    }

    const handleEditTrade = () => {
        setDoUserWantTradeDetails(false)
        setDoUserNeedEditTradeWindow(true)
    }


    useEffect(() => {
        if (pagination.pages !== 0 && pagination.pages < currentPage) {
            setCurrentPage(pagination.pages)
        }
    }, [pagination.pages])


    const handleFiltringOnTrades = (filter) => {
        let tradesInstance = trades;
        switch (filter) {
            case "all":
                setFilterMode('all')
                setShowArr(trades)
                break;
            case "open":

                let openTrades = tradesInstance.filter(trade => trade.status === 0)
                setFilterMode('open')
                setShowArr(openTrades)
                break;
            case "close":
                let closeTrades = tradesInstance.filter(trade => trade.status === 1)
                setFilterMode('close')
                setShowArr(closeTrades)
                break;
            case "win":
                let winTrades = tradesInstance.filter(trade => trade.pnl > 0)
                setFilterMode('win')
                setShowArr(winTrades)
                break;
            case "lose":
                let loseTrades = tradesInstance.filter(trade => trade.pnl < 0)
                setFilterMode('lose')
                setShowArr(loseTrades)
                break;
        }
    }

    var iteration = pagination.startIndex + 1;

    const handleDateRangeWindowToggle = () => {
        if (doUserNeedDateRangeWindow) {
            setDoUserNeedDateRangeWindow(false)
        } else {
            setDoUserNeedDateRangeWindow(true)
        }
    }

    const handleDateFilter = () => {
        let dateFrom = startDate;
        let dateTo = endDate;


        if (isNull(dateFrom) || isNull(dateTo)) {
            notify("تاریخی انتخاب نشده است", "warning")
            return
        }

        if (dateFrom > dateTo) {
            notify("تاریخ های انتخابی صحیح نمی باشند", "warning")
            return
        }

        let tradesInstance = trades;
        let filteredTradesBySelectedDates = tradesInstance.filter(function (trade) {
            if (trade.trade_date > dateFrom && trade.trade_date < dateTo) return true
        })
        setStartDate(null)
        setEndDate(null)
        handleDateRangeWindowToggle()
        setShowArr(filteredTradesBySelectedDates)

    }

    return (
        <Fragment>

            <Helmet>
                <title>ترید ها - تریدبوک</title>
            </Helmet>

            <section className="py-2 mt-8">

                <div className="bg-slate-800 text-slate-400 text-xs md:text-sm flex gap-x-2">
                    <Link to={'/panel/accounts'} className="py-2 px-4">پنل کاربری</Link>
                    <Link to={`/account/${account_id}`} className="py-2 px-4">حساب</Link>
                    <span className="py-2 px-4 bg-slate-300 text-slate-900">تریدها</span>
                </div>
            </section>

            <div className="mx-2 mt-4 rounded-lg shadow-lg p-2 bg-slate-800 text-slate-400 text-sm flex gap-x-2">
                <div className="grid grid-cols-12 gap-x-2  w-full">

                    <SearchTrade handleSearchInp={handleSearchInp} />

                    <div className="col-span-6 md:col-span-4 grid grid-cols-4 gap-x-1">
                        <div className={`relative col-span-1 backdrop-blur-lg ${doUserNeedDateRangeWindow ? "bg-slate-700" : "bg-slate-900/70"} rounded-lg text-sm md:text-xl text-center`}>
                            <button className="block w-full h-full py-4 rounded-lg" onClick={() => handleDateRangeWindowToggle()}>
                                <i className="fa-duotone fa-calendar-days text-orange-300"></i>
                            </button>
                            {!doUserNeedDateRangeWindow ? null : (
                                <DateRangePickerWindow setStartDate={setStartDate} setEndDate={setEndDate} handleDateFilter={handleDateFilter} />
                            )}
                        </div>
                        <CSVLink className="col-span-1 backdrop-blur-lg bg-slate-900/70 rounded-lg py-4 text-sm md:text-xl text-center" data={csvData}
                            filename={`TradeBook-Exported-Trades-${exportDate}.csv`}>
                            <i className="fa-duotone fa-file-export text-slate-300"></i>
                        </CSVLink>
                        <button className="col-span-1 backdrop-blur-lg bg-slate-900/70 rounded-lg py-4 text-sm md:text-xl text-center" onClick={() => setDoUserNeedUpdatePriceWindow(true)}>
                            <i className="fa-duotone fa-arrows-retweet text-emerald-400"></i>
                        </button>
                        <button className="col-span-1 backdrop-blur-lg bg-slate-900/70 rounded-lg py-4 text-sm md:text-xl text-center" onClick={() => setDoUserNeedCreateTradeWindow(true)}>
                            <i className="fa-solid fa-plus text-blue-500"></i>
                        </button>
                    </div>


                </div>
            </div>

            <section className="mt-2 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">تریدها</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTrades('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'open' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTrades('open')}>باز</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'close' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTrades('close')}>بسته</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'win' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTrades('win')}>در سود</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'lose' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTrades('lose')}>در ضرر</span>
                    </div>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">تاریخ</th>
                                <th className="py-2">جفت ارز</th>
                                <th className="py-2 hidden sm:block">نوع</th>
                                <th className="py-2">درصد
                                    <i className="fa-solid fa-sort text-xxs lg:text-xs cursor-pointer"></i>
                                </th>
                                <th className="py-2">عملیات</th>


                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map((trade) => (

                                <Trade key={trade.id} trade={trade} index={iteration++} setDoUserWantTradeDetails={setDoUserWantTradeDetails} setTrade={setTrade} setDoUserNeedEditTradeWindow={setDoUserNeedEditTradeWindow} handleDelTrade={handleDelTrade} />
                            ))}


                        </tbody>


                    </table>

                    {(showArr.length <= perPage) ? (null) : (
                        <Paginate currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />

                    )}

                </section>
            </section>

            <AnimatePresence>
                {doUserNeedUpdatePriceWindow && (<UpdatePriceWindow setDoUserNeedUpdatePriceWindow={setDoUserNeedUpdatePriceWindow} trades={trades} account_id={account_id} />)}
                {doUserNeedCreateTradeWindow && (<CreateTradeInputWindow setDoUserNeedCreateTradeWindow={setDoUserNeedCreateTradeWindow} acc_id={account_id} accType={accType} />)}
                {doUserNeedEditTradeWindow && (<EditTradeInputWindow setDoUserNeedEditTradeWindow={setDoUserNeedEditTradeWindow} trade={trade} acc_id={account_id} accType={accType} />)}
                {doUserWantTradeDetails && (<TradeDetailsWindow setDoUserWantTradeDetails={setDoUserWantTradeDetails} trade={trade} handleDelTrade={handleDelTrade} handleEditTrade={handleEditTrade} />)}

                {blurConditions && (<motion.div exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></motion.div>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default Trades;