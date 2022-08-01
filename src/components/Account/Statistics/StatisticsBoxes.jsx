import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';

const StatisticsBoxes = ({ balance, allTrades, favePair, lastTradeDate }) => {

    const [fromlastTrade, setFromLastTrade] = useState("در حال بروز رسانی");

    useEffect(() => {
        if (!lastTradeDate) {
            setFromLastTrade('بدون ترید')
            return;
        }
        if (isEmpty(lastTradeDate)) return;
        let from_now = moment(lastTradeDate, "YYYY-MM-DD").fromNow();
        setFromLastTrade(from_now)

    }, [lastTradeDate])

    return (
        <Fragment>
            <div className="col-span-6 md:col-span-2 grid grid-cols-2 gap-2 text-white">
                <div className="col-span-1 flex flex-col gap-y-2 h-52">
                    <span
                        className="bg-slate-300 h-5/6 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                        {allTrades}
                    </span>
                    <span className="row-span-1 text-sm text-center">تعداد کل ترید ها</span>
                </div>
                <div className="col-span-1 flex flex-col gap-y-2 h-52">
                    <span
                        className="bg-slate-300 h-5/6 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                        {Math.floor(balance)}
                    </span>
                    <span className="row-span-1 text-sm text-center">بالانس حساب</span>
                </div>
                <div className="col-span-1 flex flex-col gap-y-2 h-52">
                    <span style={{ direction: "ltr" }}
                        className="bg-slate-300 h-5/6 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                        {fromlastTrade}
                    </span>
                    <span className="row-span-1 text-sm text-center">آخرین ترید شما</span>
                </div>
                <div className="col-span-1 flex flex-col gap-y-2 h-52">
                    <span
                        className="bg-slate-300 h-5/6 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">
                        {`${favePair.name} (${favePair.count})`}
                    </span>
                    <span className="row-span-1 text-sm text-center">جفت ارز محبوب</span>
                </div>




            </div>
        </Fragment>
    );
}

export default StatisticsBoxes;