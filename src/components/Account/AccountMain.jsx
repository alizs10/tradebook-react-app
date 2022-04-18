import React, { Fragment, useEffect, useState } from 'react';

import moment from 'moment';


import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paginate } from '../Services/Pagination';
import { getAllTrades } from '../Redux/Action/Trades';
import { useNavigate, useParams } from 'react-router';
import { notify } from '../Services/alerts';
import { getAccounts } from '../Services/DataLoader';
import { setCryptoPairs, setForexPairs } from '../Redux/Action/Pairs';
import SnapshotWindow from './SnapshotWindow';
import StopLossAndTakeProfitSection from './StopLossAndTakeProfitSection';
import { isEmpty } from 'lodash';
import { ClipLoader } from 'react-spinners';

const AccountMain = () => {

    const [didUserTakeSnapshot, setDidUserTakeSnapshot] = useState(false);
    const [loading, setLoading] = useState(true);

    const trades = useSelector(state => state.Trades);
    const [statistics, setStatistics] = useState({});
    const [stopLossesAverage, setStopLossesAverage] = useState({
        value: "...",
        ideal_value: "1",
        cv: "...",
        status: "...",
        hint: "..."
    })
    const [takeProfitsAverage, setTakeProfitsAverage] = useState({
        value: "...",
        ideal_value: "1",
        cv: "...",
        status: "...",
        hint: "..."
    })
    const [updatedAt, setUpdatedAt] = useState("...")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { account_id } = useParams();

    useEffect(async () => {
        const { data } = await getAccounts();
        const accounts = data.accounts;
        const matched_accs = accounts.filter(acc => acc.id === parseInt(account_id))
        if (trades.length === 0) {
            if (matched_accs.length !== 0) {
                dispatch(getAllTrades(account_id))
            } else {
                navigate('/panel/accounts');
                notify('این حساب وجود ندارد', 'error')
            }
        }

        prepareStatistics(matched_accs[0].statistic_values)
        if (matched_accs[0].type === 0) {
            dispatch(setCryptoPairs())
        } else {
            dispatch(setForexPairs())
        }
    }, [])

    const prepareStatistics = (statisticsObj) => {
        let preparedValuesObj = {};
        let notCalculated = {
            value: "محاسبه نشده",
            ideal_value: "1",
            status: "محاسبه نشده",
            hint: "محاسبه نشده"
        }
        statisticsObj.forEach(statisticObj => {
            switch (statisticObj.statistic_name) {
                case 'all_trades':
                    preparedValuesObj = { ...preparedValuesObj, allTrades: statisticObj.value }
                    break;
                case 'average_pnl':
                    preparedValuesObj = { ...preparedValuesObj, averagePnl: statisticObj.value }
                    break;
                case 'updated_balance':
                    preparedValuesObj = { ...preparedValuesObj, updatedBalance: statisticObj.value }
                    break;
                case 'win_ratio':
                    preparedValuesObj = { ...preparedValuesObj, winRatio: statisticObj.value }
                    break;
                case 'best_pnl':
                    preparedValuesObj = { ...preparedValuesObj, bestPnl: JSON.parse(statisticObj.value) }
                    break;
                case 'worst_pnl':
                    preparedValuesObj = { ...preparedValuesObj, worstPnl: JSON.parse(statisticObj.value) }
                    break;
                case 'stop_losses_average':
                    setUpdatedAt(moment(statisticObj.updated_at).locale('fa').fromNow())
                    statisticObj.value == 0 ? setStopLossesAverage(notCalculated) : setStopLossesAverage(JSON.parse(statisticObj.value))
                    break;
                case 'take_profits_average':
                    statisticObj.value == 0 ? setTakeProfitsAverage(notCalculated) : setTakeProfitsAverage(JSON.parse(statisticObj.value))
                    break;
            }
        });

        setStatistics(preparedValuesObj);
        setLoading(false)
    }
    const [showArr, setShowArr] = useState(paginate([], 5, 1));

    useEffect(() => {

        if (!isEmpty(trades)) {
            setShowArr(paginate(trades, 5, 1))
        }

    }, [trades])




    return (
        <Fragment>

            <section className="py-2 mt-8">

                <div className="bg-slate-800 text-slate-400 text-xs md:text-sm flex gap-x-2">
                    <Link to={'/panel/accounts'} className="py-2 px-4">پنل کاربری</Link>
                    <span className="py-2 px-4 bg-slate-300 text-slate-900">حساب</span>
                </div>
            </section>

            <section className="mt-4 flex flex-col gap-y-4">


                <div className="flex justify-between mx-2">
                    <h2 className="mr-2 text-sm text-slate-400">خلاصه عملکرد شما</h2>

                    <Link to="statistics" className="text-sm text-blue-500 flex justify-center items-center">بیشتر
                        <i className="fa-duotone fa-left-long mr-2"></i>
                    </Link>

                </div>

                <div className="rounded-lg shadow lg p-2 mx-2 bg-emerald-400 grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="col-span-1 grid grid-rows-4 gap-y-2 h-52">
                        <span
                            className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                            {loading ? (
                                <ClipLoader color={'#000'} size={25} />
                            ) : (
                                Math.floor(statistics.winRatio)
                            )}
                        </span>
                        <span className="row-span-1 text-sm text-center">درصد برد شما</span>
                    </div>
                    <div className="col-span-1 grid grid-rows-4 gap-y-2 h-52">
                        <span
                            className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                            {loading ? (
                                <ClipLoader color={'#000'} size={25} />
                            ) : (
                                Math.floor(statistics.averagePnl)
                            )}
                        </span>
                        <span className="row-span-1 text-sm text-center">میانگین سود های شما</span>
                    </div>
                    <div className="col-span-1 grid grid-rows-4 gap-y-2 h-52">
                        <span
                            className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                            {loading ? (
                                <ClipLoader color={'#000'} size={25} />
                            ) : (
                                Math.floor(statistics.updatedBalance)
                            )}
                        </span>
                        <span className="row-span-1 text-sm text-center">بالانس حساب شما</span>
                    </div>
                    <div className="col-span-1 grid grid-rows-4 gap-y-2 h-52">
                        <span
                            className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                            {loading ? (
                                <ClipLoader color={'#000'} size={25} />
                            ) : (
                                statistics.allTrades
                            )}
                        </span>
                        <span className="row-span-1 text-sm text-center">تعداد کل معاملات شما</span>
                    </div>
                    <div className="col-span-2 md:col-span-4 flex justify-end">
                        <button className="p-2 text-xl md:text-2xl backdrop-blur-lg text-slate-900 rounded-lg bg-slate-900/30" onClick={() => setDidUserTakeSnapshot(true)}>
                            <i className="fa-regular fa-camera-retro"></i>
                        </button>
                    </div>
                </div>



            </section>

            <StopLossAndTakeProfitSection setUpdatedAt={setUpdatedAt} setStopLossesAverage={setStopLossesAverage} setTakeProfitsAverage={setTakeProfitsAverage} account_id={account_id} updatedAt={updatedAt} stopLossesAverage={stopLossesAverage} takeProfitsAverage={takeProfitsAverage} />

            <section className="mt-8 flex flex-col gap-y-4">

                <div className="flex justify-between mx-2">
                    <h2 className="text-sm text-slate-400">آخرین تریدها</h2>

                    <Link to="trades" className="text-sm text-blue-500 flex justify-center items-center">بیشتر
                        <i className="fa-duotone fa-left-long mr-2"></i>
                    </Link>

                </div>

                <section className="py-2 mx-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">
                    {trades.length === 0 ? (
                        <div className='row-head w-100'>
                            <p className='text-center w-100'>اولین ترید خود را ثبت کنید</p>
                        </div>
                    ) : (
                        <table className="border-collapse text-right min-w-full">

                            <thead>
                                <tr className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                    <th className="py-2 pr-1">#</th>
                                    <th className="py-2">جفت ارز</th>
                                    <th className="py-2">نوع</th>
                                    <th className="py-2">درصد
                                        <i className="fa-solid fa-sort text-xxs lg:text-xs cursor-pointer"></i>
                                    </th>
                                </tr>

                            </thead>

                            <tbody>
                                {showArr.sliced_array.map((trade, index) => (
                                    <tr key={trade.id} className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
                                        <td className="py-4 pr-1">{index + 1}</td>
                                        <td className="py-4">{moment(trade.trade_date, 'YYYY-jM-jD').format('YYYY/MM/DD') }</td>                               
                                        <td className="py-4">{trade.pair_name}</td>
                                        <td className="py-4">{trade.contract_type === 0 ? 'Long' : 'Short'}</td>
                                        <td className="py-4" style={{ "direction": "ltr" }}>
                                            {trade.pnl > 0 ? (<i className="fa-regular fa-caret-up text-lg mr-1 text-emerald-400"></i>) : (<i className="fa-regular fa-caret-down text-lg mr-1 text-red-400"></i>)}
                                            <span style={{ "direction": "ltr" }}>{`${trade.pnl} %`}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    )}


                </section>

            </section>

            {!didUserTakeSnapshot ? null : (
                <SnapshotWindow statistics={statistics} setDidUserTakeSnapshot={setDidUserTakeSnapshot} />
            )}

            {!didUserTakeSnapshot ? null : (<div className="fixed top-0 left-0 w-full h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => setDidUserTakeSnapshot(false)}></div>
            )}

        </Fragment>
    );
}

export default AccountMain;