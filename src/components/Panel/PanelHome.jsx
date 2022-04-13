import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setHomeData } from '../Redux/Action/HomeData';
import { getAllNotifications } from '../Redux/Action/Notifications';
import Alert from '../Alerts/Alert';

const PanelHome = () => {

    const [loading, setLoading] = useState(true)
    const [homeStat, setHomeStat] = useState({ accountsCount: 0, tradesCount: 0, notesCount: 0, validFor: 0, planName: "..." })
    const [homeNotifs, setHomeNotifs] = useState({})

    const dispatch = useDispatch()
    const data = useSelector(state => state.HomeData)
    const notifications = useSelector(state => state.Notifications)
    const user = useSelector(state => state.User)

    useEffect(() => {

        dispatch(setHomeData())
        dispatch(getAllNotifications())

    }, [])

    useEffect(() => {
        if (isEmpty(data))
            return
        setLoading(false)

        setHomeStat(data.data)
    }, [data])

    useEffect(() => {
        if (isEmpty(notifications)) return

        let showNotifs = notifications.filter(notif => notif.section === "home" && notif.seen == 0);
        setHomeNotifs(showNotifs)
    }, [notifications])

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

                {homeNotifs.length > 0 ? homeNotifs.map(notif => (
                    <Alert key={notif.id} notification_id={notif.id} message={notif.message} type={notif.type} />
                )) : (
                    <p className='text-right text-sm text-slate-300'>پیغامی برای نمایش وجود ندارد</p>
                )}
            </div>
        </Fragment>
    );
}

export default PanelHome;