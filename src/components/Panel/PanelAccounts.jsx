import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts } from '../Redux/Action/Accounts';
import Account from './Account';
import CreateAccWin from './CreateAccWin';
import EditAccWin from './EditAccWin';



const PanelAccounts = () => {

    const [doUserWantCreateAccWin, setDoUserWantCreateAccWin] = useState(false);
    const [doUserWantEditAccWin, setDoUserWantEditAccWin] = useState(false);
    const [acc, setAcc] = useState({});

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
        dispatch(getAllAccounts())
    }, [])
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

                <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        توجه: در هنگام ساخت حساب، منظور از بالانس اولیه همان مقدار اولیه بالانس شما در هنگام اولین تریدتان می باشد. در صورتیکه این مقدار اشتباه وارد شود؛ محاسباتی که برای شما انجام میگیرد اشتباه خواهند بود. پس کاملا دقت کنید
                    </p>
                </div>


            </div>

            {!doUserWantCreateAccWin ? null : (<CreateAccWin setDoUserWantCreateAccWin={setDoUserWantCreateAccWin} />)}
            {!doUserWantEditAccWin ? null : (<EditAccWin acc={acc} setDoUserWantEditAccWin={setDoUserWantEditAccWin} />)}

            {!blurConditions ? null : (<div className="fixed top-0 left-0 w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => handleCloseOpenWindow()}></div>)}
        </Fragment>
    );
}

export default PanelAccounts;