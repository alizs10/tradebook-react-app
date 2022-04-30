import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';
import { AddUser, ClearUser } from '../Redux/Action/User';
import { notify } from '../Services/alerts';
import { getUserByToken } from '../Services/AuthService';

const AuthCkeck = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [checking, setChecking] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    useEffect(async () => {
        
        let unmounted = false;

        if (!unmounted) {
            let token = localStorage.getItem('token');

            if (!token) {
                dispatch(ClearUser())
                if (location.pathname === '/' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname.includes('/reset-password/')) {
                    setChecking(false)
                    return
                }
    
                navigate('/')
                setChecking(false)
                notify("به حساب کاربری خود وارد شوید", "warning")
                return;
            }
    
            try {
                const { status, data } = await getUserByToken(token)
    
                if (status === 200) {
                    dispatch(AddUser(data.user))
                    setChecking(false)
                    if (location.pathname === '/' || location.pathname === '/register') {
                        navigate('/panel/')
                    }
    
                }
            } catch (error) {
                localStorage.removeItem('token')
                setChecking(false)
                navigate('/')
            }
    
        }

        return () => {
            unmounted = true;
        }

    }, [])

    return (
        <Fragment>
            {checking ? null : children}
            <div style={style}>
                <SyncLoader color={'#ffffff'} loading={checking} size={15} />
            </div>
        </Fragment>
    );
}

export default AuthCkeck;