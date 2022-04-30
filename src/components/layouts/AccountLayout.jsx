import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { setAccount } from '../Redux/Action/Account';
import { ShowAcc } from '../Services/AccSevices';
import { notify } from '../Services/alerts';

const AccountLayout = ({ children }) => {

    const user = useSelector(state => state.User);
    const [avatar, setAvatar] = useState("");

    const dispatch = useDispatch();
    const { account_id } = useParams();
    const navigate = useNavigate()

    useEffect(async () => {
        

        let unmounted = false;

        if (!unmounted) {
            const { status, data } = await ShowAcc(account_id)

            if (status === 200) {
                dispatch(setAccount(data.account))
            } else if (status === 422) {
                navigate('/panel/accounts')
                notify('این حساب وجود ندارد', 'warning')
            } else {
                navigate('/panel/accounts')
                notify('خطایی رخ داده است', 'danger')
            }
        }

        return () => {
            unmounted = true;
        }
    }, [])

    useEffect(() => {
        if (isEmpty(user)) return
        setAvatar(user.profile_photo_path)
    }, [user])

    return (
        <Fragment>

            <Helmet>
                <title>حساب شما - تریدبوک</title>
            </Helmet>

            <header
                className="flex justify-end md:justify-between items-center fixed top-0 left-0 z-50 w-full h-16 bg-slate-900 border-b-2 border-slate-800 shadow-lg">

                <div className="flex justify-between w-full">

                    <div className="flex items-center gap-x-2">

                        {!avatar ? null : (<img src={`http://localhost:8000/${avatar}`} alt="avatar" className="rounded-full w-12 h-12 mr-2" />)}

                        <div className="flex flex-col gap-y-2">
                            <span className="text-slate-300 text-sm">{user.name}</span>
                            <span className="text-emerald-400 text-xxs">آنلاین</span>
                        </div>
                    </div>


                    <div className="flex items-center">
                        <h1 className="ml-2 text-xl md:text-4xl text-slate-100">
                            <span className="text-emerald-400">T</span>rade<span className="text-red-400">B</span>ook<span
                                className="text-xxxs text-slate-300">V 1.0.0</span>
                        </h1>
                    </div>


                </div>

            </header>

            <main className="mt-20 relative">

                {children}

            </main>

            <footer className="text-center mt-8">
                <span className="text-xxs text-slate-500">Copyright <i className="fa-regular fa-copyright"></i> 2022</span>
            </footer>


        </Fragment>
    );
}

export default AccountLayout;