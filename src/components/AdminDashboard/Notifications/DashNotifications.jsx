import React, { Fragment, useEffect, useState } from 'react';
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import { DestroyNotification, getAdminNotifications } from '../../Services/Admin/NotificationsServices'
import EditNotificationWindow from './EditNotificationWindow';
import DetailsNotificationWindow from './DetailsNotificationWindow';
import Notification from './Notification';
import CreateNotificationWindow from './CreateNotificationWindow';
import Helmet from 'react-helmet';

const DashNotifications = () => {

    const [notifications, setNotifications] = useState([])
    const [showArr, setShowArr] = useState(notifications);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [notification, setNotification] = useState({});
    const [filterMode, setFilterMode] = useState("all");

    const [doUserNeedCreateNotificationWindow, setDoUserNeedCreateNotificationWindow] = useState(false);
    const [doUserNeedDetailsNotificationWindow, setDoUserNeedDetailsNotificationWindow] = useState(false);
    const [doUserNeedEditNotificationWindow, setDoUserNeedEditNotificationWindow] = useState(false);
    const blurConditions = doUserNeedCreateNotificationWindow || doUserNeedEditNotificationWindow || doUserNeedDetailsNotificationWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreateNotificationWindow) {
            setDoUserNeedCreateNotificationWindow(false)
        } else if (doUserNeedEditNotificationWindow) {
            setDoUserNeedEditNotificationWindow(false)
        } else {
            setDoUserNeedDetailsNotificationWindow(false)
        }
    }

    useState(async () => {

        let unmounted = false;

        if (!unmounted) {
            const { data, status } = await getAdminNotifications()

            if (status == 200) {
                setNotifications(data.notifications)
            }
        }

        return () => {
            unmounted = true;
        }

    }, [])
    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            if (isUserSearching) {

                handleSearch(searchInp)
                return
            }

            setShowArr(notifications)
        }

        return () => {
            unmounted = true;
        }

    }, [notifications])

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            setPagination(paginate(showArr, 5, currentPage))

        }

        return () => {
            unmounted = true;
        }
    }, [showArr])

    useEffect(() => {


        let unmounted = false;

        if (!unmounted) {
            setPagination(paginate(showArr, 5, currentPage))
        }

        return () => {
            unmounted = true;
        }
    }, [currentPage])

    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = notifications.filter(notification => notification.message.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(notifications)
        }

    }

    const handleFiltringOnNotifications = (filter) => {

        let notificationsInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(notifications)
                break;

            case "active":
                notificationsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(notifications)
                let activeNotifications = notificationsInstance.filter(notification => notification.seen == 0)
                setFilterMode('active')
                setShowArr(activeNotifications)
                break;
            case "inactive":
                notificationsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(notifications)
                let inactiveNotifications = notificationsInstance.filter(notification => notification.seen == 1)
                setFilterMode('inactive')
                setShowArr(inactiveNotifications)
                break;
        }
    }

    const handleDelNotification = (notification_id) => {
        confirm('حذف اعلان', 'آیا می خواهید اعلان مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyNotification(notification_id)

                    if (status == 200) {
                        let notificationsInstance = structuredClone(notifications);
                        notificationsInstance = notificationsInstance.filter(notif => notif.id !== notification_id)
                        setNotifications(notificationsInstance)
                        doUserNeedDetailsNotificationWindow && setDoUserNeedDetailsNotificationWindow(false)
                        notify('اعلان موردنظر با موفقیت حذف شد', 'success');

                    } else {
                        notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                    }
                } catch (error) {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                }
            },
            function () {
                notify('درخواست شما لغو شد', 'warning');
            }
        )
    }

    return (
        <Fragment>
            <Helmet>
                <title>اعلان های ارسالی پنل - تریدبوک</title>
            </Helmet>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">اعلان های ارسالی پنل</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnNotifications('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'active' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnNotifications('active')}>فعال</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'inactive' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnNotifications('inactive')}>غیرفعال</span>


                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم اعلان؟" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreateNotificationWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">اعلان</th>
                                <th className="py-2">وضعیت</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(notification => (

                                <Notification iteration={iteration++} key={notification.id} notification={notification} setNotification={setNotification} handleDelNotification={handleDelNotification} setDoUserNeedEditNotificationWindow={setDoUserNeedEditNotificationWindow} setDoUserNeedDetailsNotificationWindow={setDoUserNeedDetailsNotificationWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون اعلان</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsNotificationWindow ? null : (<DetailsNotificationWindow setDoUserNeedDetailsNotificationWindow={setDoUserNeedDetailsNotificationWindow} notification={notification} handleDelNotification={handleDelNotification} setDoUserNeedEditNotificationWindow={setDoUserNeedEditNotificationWindow} />)}
            {!doUserNeedEditNotificationWindow ? null : (<EditNotificationWindow notifications={notifications} setNotifications={setNotifications} setDoUserNeedEditNotificationWindow={setDoUserNeedEditNotificationWindow} notification={notification} />)}
            {!doUserNeedCreateNotificationWindow ? null : (<CreateNotificationWindow notifications={notifications} setNotifications={setNotifications} setDoUserNeedCreateNotificationWindow={setDoUserNeedCreateNotificationWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full md:w-3/4 h-screen backdrop-blur-lg bg-slate-800/70 z-20" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashNotifications;