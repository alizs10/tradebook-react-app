import React from 'react';

const MoreStatistics = ({ averagePnl, winRatio, averageMinusPnl, wins, losts, bestPnl, worstPnl, profit, profitPercentage, positiveProfit, negetiveProfit }) => {
    return (

        <section className="mt-8 flex flex-col gap-y-4">


            <h2 className="text-sm text-slate-400 mr-2">آمار و آنالیز حساب</h2>



            <section className="py-2 mx-2 bg-slate-800 shadow-lg rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">

                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {`${Math.floor(winRatio)} %`}
                    </span>
                    <span className="text-sm">درصد برد معاملات</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {`${Math.floor(averagePnl)} %`}
                    </span>
                    <span className="text-sm">میانگین درصد سود ها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {`${Math.floor(averageMinusPnl)} %`}
                    </span>
                    <span className="text-sm">میانگین درصد ضرر ها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {wins}
                    </span>
                    <span className="text-sm">برد ها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {losts}
                    </span>
                    <span className="text-sm">باخت ها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 flex justify-center flex-col gap-y-1 border-slate-900">
                        <span>{`${Math.floor(bestPnl.value)} %`}</span>
                        <span className='text-sm'>{bestPnl.pair_name}</span>
                    </span>
                    <span className="text-sm">بیشترین سود</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 flex justify-center flex-col gap-y-1 border-slate-900">
                        <span>{`${Math.floor(worstPnl.value)} %`}</span>
                        <span className='text-sm'>{worstPnl.pair_name}</span>
                    </span>
                    <span className="text-sm">بیشترین ضرر</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {`${Math.floor(positiveProfit)} $`}
                    </span>
                    <span className="text-sm">مجموع سودها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 border-b-2 border-slate-900">
                        {`${Math.floor(negetiveProfit)} $`}
                    </span>
                    <span className="text-sm">مجموع ضررها</span>
                </div>
                <div style={{ direction: "ltr" }} className="col-span-1 flex flex-col items-center justify-center gap-y-2 h-52 rounded-lg backdrop-blur-md bg-emerald-300/80 text-slate-900">
                    <span className="text-3xl pb-2 flex flex-col justify-center gap-y-1 border-b-2 border-slate-900">
                        <span>{`${Math.floor(profit)} $`}</span>
                        <span className='text-sm text-center'>{`${profitPercentage} %`}</span>
                    </span>
                    <span className="text-sm">وضعیت کلی سود/ضرر</span>
                </div>


            </section>

        </section>

    );
}

export default MoreStatistics;