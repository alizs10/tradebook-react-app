import React, { useEffect } from 'react';

import { Outlet, Route, Routes } from 'react-router';
import AccountMain from '../Account/AccountMain';
import Statistics from '../Account/Statistics/Statistics';
import Trades from '../Account/Trades/Trades';
import ActivationCheck from '../Auth/ActivationCheck';
import AuthCkeck from '../Auth/AuthCheck';
import ForgotPassword from '../Auth/ForgotPassword';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ResetPassword from '../Auth/ResetPassword';
import AccountLayout from '../layouts/AccountLayout';
import AuthLayout from '../layouts/AuthLayout';
import PanelLayout from '../layouts/PanelLayout';
import PanelAbout from '../Panel/PanelAbout';
import PanelAccounts from '../Panel/PanelAccounts';
import PanelHome from '../Panel/PanelHome';
import PanelNotebook from '../Panel/PanelNotebook';
import PanelPlans from '../Panel/PanelPlans';
import PanelProfile from '../Panel/PanelProfile';




const Tradebook = () => {

    return (

        <Routes>
            <Route path='/' element={
                <AuthCkeck>
                    <AuthLayout><Outlet /></AuthLayout>
                </AuthCkeck>
            }>
                <Route path='/' element={
                    <Login />
                } />
                <Route path='/register' element={
                    <Register />
                } />
                <Route path='/forgot-password' element={
                    <ForgotPassword />
                } />
                <Route path='/reset-password/:token/:email' element={
                    <ResetPassword />
                } />
            </Route>


            <Route path='/panel' element={

                <AuthCkeck>

                    <PanelLayout>
                        <Outlet />
                    </PanelLayout>

                </AuthCkeck>
            }>
                <Route path='/panel' element={
                    <ActivationCheck>
                        <PanelHome />
                    </ActivationCheck>

                } />
                <Route path='accounts' element={
                    <ActivationCheck>
                        <PanelAccounts />
                    </ActivationCheck>

                } />
                <Route path='profile' element={<PanelProfile />} />
                <Route path='plans' element={<PanelPlans />} />
                <Route path='notebook' element={
                    <ActivationCheck>
                        <PanelNotebook />
                    </ActivationCheck>

                } />
                <Route path='about' element={<PanelAbout />} />

            </Route>

            <Route path='account' element={<AccountLayout><Outlet /></AccountLayout>}>
                <Route path=':account_id' element={
                    <AuthCkeck>
                        <ActivationCheck>
                            <AccountMain />
                        </ActivationCheck>
                    </AuthCkeck>
                }></Route>
                <Route path=':account_id/statistics' element={
                    <AuthCkeck>
                        <ActivationCheck>
                            <Statistics />
                        </ActivationCheck>
                    </AuthCkeck>
                }></Route>
                <Route path=':account_id/trades' element={
                    <AuthCkeck>
                        <ActivationCheck>
                            <Trades />
                        </ActivationCheck>
                    </AuthCkeck>
                }></Route>
            </Route>

        </Routes>

    );
}

export default Tradebook;