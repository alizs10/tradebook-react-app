import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeData } from '../Redux/Action/HomeData';
import { getAllNotifications } from '../Redux/Action/Notifications';
import Alert from '../Alerts/Alert';
import Helmet from 'react-helmet';
import HomeStat from './HomeStat';

const PanelHome = () => {

    const [loading, setLoading] = useState(true)
    const [homeStats, setHomeStats] = useState([{ name: "حساب ها", value: 0 }, { name: "ترید ها", value: 0 }, { name: "یادداشت ها", value: 0 }, { name: "روزهای باقی مانده", value: 0 }, { name: "اشتراک", value: "..." }])
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
        if (!isEmpty(data)) {
            setLoading(false)
            setHomeStats(data.data)
        }
    }, [data])

    useEffect(() => {
        if (isEmpty(notifications)) return

        let showNotifs = notifications.filter(notif => (notif.section === "home" && notif.seen == 0));
        setHomeNotifs(showNotifs)
    }, [notifications])

    return (
        <Fragment>

            <Helmet>
                <title>خانه - تریدبوک</title>
            </Helmet>
            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">نمای کلی</h2>
            </div>


            <section className="mx-2 mt-4 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">

                {homeStats.map((stat) => (
                    <HomeStat key={Math.random() * 1000} stat={stat} loading={loading} />
                ))}

                <div className="grid grid-cols-4 items-center rounded-lg shadow bg-slate-800 p-1 lg:h-20">

                    <span className="col-span-1">
                        <i className="fa-light fa-user-tag text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="col-span-3 grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">{user.is_admin == 1 ? "ادمین" : "عضو"}</span>
                        <span className="text-xs lg:text-base font-light text-slate-300">نقش</span>
                    </span>

                </div>

            </section>


            <div className="flex flex-col gap-y-4 mx-2 mt-4">

                <h2 className="text-slate-300 text-lg">پیغام های سیستم</h2>

                {homeNotifs.length > 0 ? homeNotifs.map(notif => (
                    <Alert key={notif.id} user_id={notif.user_id} notification_id={notif.id} message={notif.message} type={notif.type} />
                )) : (
                    <p className='text-right text-sm text-slate-300'>پیغامی برای نمایش وجود ندارد</p>
                )}
            </div>
        </Fragment>
    );
}

export default PanelHome;