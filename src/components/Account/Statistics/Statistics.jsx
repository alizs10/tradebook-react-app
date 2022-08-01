import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setStatistics } from '../../Redux/Action/Statistics';
import { getAccounts } from '../../Services/DataLoader';
import Balance from './Balance';
import MoreStatistics from './MoreStatistics';
import StatisticsBoxes from './StatisticsBoxes';

const Statistics = () => {

    const account = useSelector(state => state.Account)
    const statistics = useSelector(state => state.Statistics)

    const [balance, setBalance] = useState("")
    const [winRatio, setWinRatio] = useState("")
    const [averagePnl, setAveragePnl] = useState("")
    const [averageMinusPnl, setAverageMinusPnl] = useState("")
    const [balanceData, setBalanceData] = useState("")
    const [allTrades, setAllTrades] = useState("")
    const [worstPnl, setWorstPnl] = useState({ value: 0, pair_name: 'loading' })
    const [bestPnl, setBestPnl] = useState({ value: 0, pair_name: 'loading' })
    const [losts, setLosts] = useState("")
    const [wins, setWins] = useState("")
    const [profit, setProfit] = useState("")
    const [profitPercentage, setProfitPercentage] = useState("")
    const [positiveProfit, setPositiveProfit] = useState("")
    const [negetiveProfit, setNegetiveProfit] = useState("")
    const [lastTradeDate, setLastTradeDate] = useState("");
    const [favePair, setFavePair] = useState({ name: 'fave pair', count: '0' })

    const dispatch = useDispatch()

    useEffect(async () => {
        if (isEmpty(account)) return;

        dispatch(setStatistics(account.statistic_values))

    }, [account])

    useEffect(() => { prepareStatistics(statistics) }, [statistics])
    useEffect(() => {
        if (isEmpty(balanceData)) return;
        if (balanceData.length === 1) {
            setLastTradeDate(false);
            return
        };
        setLastTradeDate(balanceData.at(-1).date)
    }, [balanceData])


    const prepareStatistics = (statisticsObj) => {

        statisticsObj.forEach(statisticObj => {
            switch (statisticObj.statistic_name) {
                case 'all_trades':
                    setAllTrades(statisticObj.value)
                    break;
                case 'average_pnl':
                    setAveragePnl(statisticObj.value)
                    break;
                case 'updated_balance':
                    setBalance(statisticObj.value)
                    break;
                case 'balance_data':
                    setBalanceData(JSON.parse(statisticObj.value))
                    break;
                case 'win_ratio':
                    setWinRatio(statisticObj.value)
                    break;
                case 'wins':
                    setWins(statisticObj.value)
                    break;
                case 'losts':
                    setLosts(statisticObj.value)
                    break;
                case 'average_minus_pnl':
                    setAverageMinusPnl(statisticObj.value)
                    break;
                case 'best_pnl':
                    setBestPnl(JSON.parse(statisticObj.value))
                    break;
                case 'worst_pnl':
                    setWorstPnl(JSON.parse(statisticObj.value))
                    break;
                case 'fave_pair':
                    setFavePair(JSON.parse(statisticObj.value))
                    break;
                case 'profit':
                    setProfit(statisticObj.value)
                    break;
                case 'profit_percentage':
                    setProfitPercentage(statisticObj.value)
                    break;
                case 'positive_profit':
                    setPositiveProfit(statisticObj.value)
                    break;
                case 'negetive_profit':
                    setNegetiveProfit(statisticObj.value)
                    break;

            }
        });

    }

    return (
        <Fragment>
            <Helmet>
                <title>آمار و آنالیز حساب - تریدبوک</title>
            </Helmet>

            <section className="py-2 mt-8">

                <div className="bg-slate-800 text-slate-400 text-xxs md:text-sm flex gap-x-2">
                    <Link to={'/panel/accounts'} className="py-2 px-4">پنل کاربری</Link>
                    <Link to={`/account/${account.id}`} className="py-2 px-4">حساب</Link>
                    <span className="py-2 px-4 bg-slate-300 text-slate-900">آمار و آنالیز حساب</span>
                </div>
            </section>

            <section className="mt-4 flex flex-col gap-y-4">


                <h2 className="mr-2 text-sm text-slate-400">نمای کلی حساب</h2>



                <div className="rounded-lg shadow lg p-2 mx-2 border-2 border-emerald-400 grid grid-cols-6 gap-4">

                    <div className="col-span-6 md:col-span-4 flex flex-col">
                        <Balance balanceData={balanceData} />
                        <span className="text-center text-sm text-white mt-3">بالانس</span>
                    </div>

                    <StatisticsBoxes balance={balance} winRatio={winRatio} allTrades={allTrades} favePair={favePair} lastTradeDate={lastTradeDate} />

                </div>

            </section>

            <MoreStatistics averagePnl={averagePnl} winRatio={winRatio} averageMinusPnl={averageMinusPnl} wins={wins} losts={losts} bestPnl={bestPnl} worstPnl={worstPnl} profit={profit} profitPercentage={profitPercentage} positiveProfit={positiveProfit} negetiveProfit={negetiveProfit} />

        </Fragment>
    );
}

export default Statistics;