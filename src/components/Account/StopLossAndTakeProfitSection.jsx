import React, { useState } from 'react';
var moment = require('moment-jalaali')
moment.loadPersian({dialect: 'persian-modern'})

const StopLossAndTakeProfitSection = ({stopLossesAverage, takeProfitsAverage, updatedAt}) => {

    const [doUserWantInformation, setDoUserWantInformation] = useState(false)

    const toggleInformation = () => {
        doUserWantInformation ? setDoUserWantInformation(false) : setDoUserWantInformation(true)
    }


    return (
        <section className="mt-4 flex flex-col gap-y-4">


            <div className="flex justify-between mx-2">
                <h2 className="mr-2 text-sm text-slate-400">آنالیز حد ضرر و حد سود شما</h2>

            </div>

            <div className="rounded-lg p-2 shadow-lg mx-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800">

                <div className="col-span-4 md:col-span-2 bg-red-300 p-2 rounded-lg flex flex-col gap-y-2">
                    <span className="flex gap-x-2 items-center text-sm">
                        <i className="fa-regular fa-hand"></i>
                        <span>میانگین حد ضرر های شما:</span>
                        <span>{stopLossesAverage.value} %</span>

                    </span>
                    <span className="flex gap-x-2 items-center text-xs text-slate-800">
                        <i className="fa-regular fa-circle-exclamation-check text-sm"></i>
                        <span>حد ضرر ایده آل:</span>
                        <span>{stopLossesAverage.ideal_value} درصد از بالانس</span>

                    </span>
                    <span className="flex gap-x-2 items-center text-xs">
                        <i className="fa-regular fa-circle-info text-sm"></i>
                        <span>وضعیت شما:</span>
                        <span>{stopLossesAverage.status}</span>

                    </span>
                    <span className="flex gap-x-2 items-center text-xs">

                        <i className="fa-regular fa-circle-small text-sm"></i>
                        <span className="text-justify">{stopLossesAverage.hint}</span>

                    </span>
                </div>


                <div className="col-span-4 md:col-span-2 bg-green-300 p-2 rounded-lg flex flex-col gap-y-2">
                    <span className="flex gap-x-2 text-sm items-center">
                        <i className="fa-regular fa-bullseye-arrow"></i>
                        <span>میانگین حد سود های شما:</span>
                        <span>{takeProfitsAverage.value} %</span>

                    </span>

                    <span className="flex gap-x-2 items-center text-xs text-slate-800">
                        <i className="fa-regular fa-circle-exclamation-check text-sm"></i>
                        <span>حد ضرر ایده آل:</span>
                        <span>{takeProfitsAverage.ideal_value} درصد از بالانس</span>

                    </span>
                    <span className="flex gap-x-2 items-center text-xs">
                        <i className="fa-regular fa-circle-info text-sm"></i>
                        <span>وضعیت شما:</span>
                        <span>{takeProfitsAverage.status}</span>

                    </span>
                    <span className="flex gap-x-2 items-center text-xs">

                        <i className="fa-regular fa-circle-small text-sm"></i>
                        <span className="text-justify">{takeProfitsAverage.hint}</span>

                    </span>
                </div>

                <div className="col-span-2 md:col-span-4 flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{"آخرین بروزرسانی " + updatedAt}</span>
                    <div className="flex gap-x-1">
                        <button className={`p-2 text-sm md:text-xl backdrop-blur-lg ${doUserWantInformation ? "bg-yellow-200" : "bg-slate-700"} text-slate-300 rounded-lg`} onClick={() => toggleInformation()}>
                            <i className="fa-regular fa-circle-info text-gray-500"></i>
                        </button>
                        <button
                            className="px-4 py-2 text-xs md:text-sm backdrop-blur-lg bg-slate-700 text-slate-300 rounded-lg flex gap-x-1 items-center">
                            <i className="fa-duotone fa-arrows-retweet text-blue-500"></i>
                            بروزرسانی
                        </button>
                    </div>
                </div>
                {doUserWantInformation && (
                    <div className="bg-yellow-200 col-span-4 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                        <p className="font-semibold text-black text-sm leading-6 text-justify">
                            اگر اینگونه فرض کنیم که معاملات بسته شده ی شما به حد ضرر یا حد سود شما رسیده باشند، میتوانیم
                            میانگین حد ضررها و حد سودهای شما را محاسبه کنیم. باتوجه به میانگین های به دست آمده، میتوانید
                            استراتژی
                            معاملاتی بهتری را داشته باشید؛ برای مثال ما به شما خواهیم گفت که باتوجه به وضعیتتان میتوانید چه
                            مقدار ریسکی را رعایت کنید. این اطلاعات ارتباط مستقیمی با سود و زیان شما ندارد، اما نشان دهنده ی
                            رفتار شما در معاملات است. به این معنا که ممکن است شخصی حد ضرر های مناسبی داشته باشد اما بازده
                            معاملاتی اش منفی باشد و یا بلعکس. اما این اطلاعات به شما کمک خواهد کرد که اصول معاملاتی را رعایت
                            کنید و احساسات خود را کنترل کنید. مشخصاً اگر اطلاعات نادقیق و یا اشتباهی وارد کرده
                            باشید، این محاسبات نیز اشتباه خواهند بود.
                        </p>
                    </div>
                )}
            </div>



        </section>
    );
}

export default StopLossAndTakeProfitSection;