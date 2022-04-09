import { isEmpty, isNull } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setHomeData } from '../Redux/Action/HomeData';

const PanelHome = () => {

    const [loading, setLoading] = useState(true)
    const [homeStat, setHomeStat] = useState({ accountsCount: 0, tradesCount: 0, notesCount: 0, validFor: 0, planName: "..." })

    const dispatch = useDispatch()
    const data = useSelector(state => state.HomeData)
    const user = useSelector(state => state.User)

    useEffect(() => {

        dispatch(setHomeData())

    }, [])

    useEffect(() => {
        if (isEmpty(data))
            return
        setLoading(false)

        setHomeStat(data.data)
    }, [data])

    return (
        <Fragment>
            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">نمای کلی</h2>
            </div>


            <section className="mx-2 mt-4 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">

                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-rectangle-history text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.accountsCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-slate-300">حساب ها</span>
                    </span>

                </div>
                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-chart-candlestick text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.tradesCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-slate-300">ترید ها</span>
                    </span>

                </div>
                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-notes text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.notesCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-slate-300">یادداشت
                            ها</span>
                    </span>

                </div>
                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-rectangle-pro  text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                        {loading ? (
                            <ClipLoader color={'#fff'} size={15} />
                        ) : (homeStat.planName)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-slate-300">اشتراک</span>
                    </span>

                </div>
                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-clock text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.validFor)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-slate-300">روزهای باقی
                            مانده</span>
                    </span>

                </div>
                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-user-tag text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">عضو</span>
                        <span className="text-xs lg:text-base font-light text-slate-300">نقش</span>
                    </span>

                </div>

            </section>


            <div className="flex flex-col gap-y-4 mx-2 mt-4">

                <h2 className="text-slate-300 text-lg">پیغام های سیستم</h2>

                {user.status ? null : (
                    <div className="bg-red-600 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                        <p className="font-semibold text-black text-base">
                            اشتراک شما به پایان رسیده است. برای استفاده از امکانات تریدبوک، باید اشتراک خریداری کنید
                        </p>
                    </div>
                )}

                <div className="bg-green-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        اشتراک آزمایشی یک ماهه برای شما فعال شد
                    </p>
                </div>
                <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        <span className="font-bold">توجه:</span>
                        اشتراک آزمایشی یک ماهه برای ارزیابی اپلیکیشن تریدبوک به شما هدیه داده شده است. پس خواهشمندیم
                        نظرات، پیشنهادات و مشکلات این اپلیکیشن را از طریق راه های ارتباطی برای ما ارسال کنید. با سپاس از
                        همراهی شما
                    </p>
                </div>
                <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        <span className="font-bold">توجه:</span>
                        پس از پایان فاز آزمایشی و منتشر شدن نسخه پایدار اپلیکیشن تریدبوک، لازم است برای استفاده از
                        امکانات آن، اشتراک تهیه کنید.
                    </p>
                </div>

            </div>
        </Fragment>
    );
}

export default PanelHome;