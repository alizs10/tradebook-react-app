import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../Redux/Action/Accounts';
import Account from './Account';
import CreateAccWin from './CreateAccWin';
import EditAccWin from './EditAccWin';
import { AnimatePresence, motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import { getAllNotifications } from '../Redux/Action/Notifications';
import Alert from '../Alerts/Alert';

const PanelAccounts = () => {

    const [doUserWantCreateAccWin, setDoUserWantCreateAccWin] = useState(false);
    const [doUserWantEditAccWin, setDoUserWantEditAccWin] = useState(false);
    const [acc, setAcc] = useState({});
    const [accountsNotifs, setAccountsNotifs] = useState({})
    const notifications = useSelector(state => state.Notifications)

    const accounts = useSelector(state => state.Accounts);
    const blurConditions = doUserWantEditAccWin || doUserWantCreateAccWin;
    const handleCloseOpenWindow = () => {
        if (doUserWantCreateAccWin) {
            setDoUserWantCreateAccWin(false)
        } else {
            setDoUserWantEditAccWin(false)
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllAccounts())
            dispatch(getAllNotifications())

        }

        return () => {
            unmounted = true;
        }

    }, [])

    useEffect(() => {
        if (isEmpty(notifications)) return

        let showNotifs = notifications.filter(notif => notif.section === "accounts" && notif.seen == 0);
        setAccountsNotifs(showNotifs)
    }, [notifications])
    return (
        <Fragment>

            <Helmet>
                <title>حساب ها - تریدبوک</title>
            </Helmet>


            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">حساب ها</h2>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-2 mt-4 relative">
                <button onClick={() => setDoUserWantCreateAccWin(true)}
                    className="rounded-lg drop-shadow-lg bg-emerald-400 flex justify-center items-center col-span-1 h-36 hover:bg-emerald-500 transition ease-out duration-300">
                    <i className="fa-regular fa-plus text-4xl"></i>
                </button>

                {accounts.map(account => (
                    <Account key={account.id} account={account} setDoUserWantEditAccWin={setDoUserWantEditAccWin} setAcc={setAcc} />
                ))}


            </div>


            <div className="flex flex-col gap-y-4 mx-2 mt-4">

                <h2 className="text-slate-300 text-lg">پیغام های سیستم</h2>

                {accountsNotifs.length > 0 ? accountsNotifs.map(notif => (
                    <Alert key={notif.id} notification_id={notif.id} message={notif.message} type={notif.type} />
                )) : (
                    <p className='text-right text-sm text-slate-300'>پیغامی برای نمایش وجود ندارد</p>
                )}


            </div>

            <AnimatePresence>
                {doUserWantCreateAccWin && (
                    <CreateAccWin setDoUserWantCreateAccWin={setDoUserWantCreateAccWin} />
                )}
            </AnimatePresence>
            {!doUserWantEditAccWin ? null : (<EditAccWin acc={acc} setDoUserWantEditAccWin={setDoUserWantEditAccWin} />)}

            {blurConditions && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full md:w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></motion.div>)}
        </Fragment>
    );
}

export default PanelAccounts;