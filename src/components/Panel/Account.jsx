import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setAccount } from '../Redux/Action/Account';
import { getAllAccounts } from '../Redux/Action/Accounts';
import { getAllTrades } from '../Redux/Action/Trades';
import { DeleteAcc } from '../Services/AccSevices';
import { confirm, notify } from '../Services/alerts';

import { motion } from 'framer-motion';

const Account = ({ account, setDoUserWantEditAccWin, setAcc }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateToTrades = account_id => {
        dispatch(getAllTrades(account_id))
        dispatch(setAccount(account))
        navigate(`/account/${account_id}`)
    }

    const handleAccEdit = (event, acc) => {
        event.stopPropagation();
        setDoUserWantEditAccWin(true)
        setAcc(acc)
    }
    const handleAccDel = (event, acc_id) => {
        event.stopPropagation();

        confirm('حذف حساب', 'آیا می خواهید حساب خود را حذف کنید؟ تمامی معاملات شما نیز حذف خواهند شد.',
            async () => {
                const { status } = await DeleteAcc(acc_id)
                if (status === 200) {
                    dispatch(getAllAccounts())
                    notify('حساب شما با موفقیت حذف شد', 'success');

                } else {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                }
            },
            function () {
                notify('درخواست شما لغو شد', 'warning');
            }
        )


    }

    const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -50 },
    }

    return (

        <motion.div initial="hidden"
            animate="visible"
            variants={item} onClick={() => handleNavigateToTrades(account.id)}
            className="rounded-lg drop-shadow-lg cursor-pointer bg-emerald-400 flex justify-center items-center col-span-1 h-36 hover:bg-emerald-500 transition ease-out duration-300">
            <span className="text-sm">{account.name}</span>
            <div className="flex gap-x-4 absolute bottom-0 left-0 mb-2 ml-2">
                <button className="text-xl text-gray-800 rounded-lg" onClick={(event) => handleAccEdit(event, account)}>
                    <i className="fa-solid fa-edit"></i>
                </button>
                <button className="text-xl text-gray-800 rounded-lg" onClick={(event) => handleAccDel(event, account.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </motion.div>

    );
}

export default Account;