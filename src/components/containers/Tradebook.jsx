import React, { useEffect } from 'react';

import { Navigate, Outlet, Route, Routes } from 'react-router';
import AccountMain from '../Account/AccountMain';
import Statistics from '../Account/Statistics/Statistics';
import Trades from '../Account/Trades/Trades';
import DashAdminPairs from '../AdminDashboard/AdminPairs/DashAdminPairs';
import DashAdminTickets from '../AdminDashboard/AdminTickets/DashAdminTickets';
import ShowAdminTicket from '../AdminDashboard/AdminTickets/ShowAdminTicket/ShowAdminTicket';
import DashHome from '../AdminDashboard/DashHome';
import DashDiscounts from '../AdminDashboard/Discounts/DashDiscounts';
import DashOrders from '../AdminDashboard/Orders/DashOrders';
import DashPayments from '../AdminDashboard/Payments/DashPayments';
import DashProducts from '../AdminDashboard/Products/DashProducts';
import DashProfile from '../AdminDashboard/Profile/DashProfile';
import DashUsers from '../AdminDashboard/Users/DashUsers';
import ActivationCheck from '../Auth/ActivationCheck';
import AdminCheck from '../Auth/AdminCheck';
import AuthCkeck from '../Auth/AuthCheck';
import ForgotPassword from '../Auth/ForgotPassword';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ResetPassword from '../Auth/ResetPassword';
import AccountLayout from '../layouts/AccountLayout';
import AdmminDashLayout from '../layouts/AdminDashboard/AdminDashLayout';
import AuthLayout from '../layouts/AuthLayout';
import PanelLayout from '../layouts/PanelLayout';
import BuyProduct from '../Panel/BuyProduct/BuyProduct';
import PaymentResult from '../Panel/BuyProduct/PaymentResult';
import PanelAbout from '../Panel/PanelAbout';
import PanelAccounts from '../Panel/PanelAccounts';
import PanelHome from '../Panel/PanelHome';
import PanelNotebook from '../Panel/PanelNotebook';
import PanelPlans from '../Panel/PanelPlans';
import PanelProfile from '../Panel/PanelProfile';
import ShowTicket from '../Panel/ShowTicket/ShowTicket';
import PanelOrders from '../Panel/Orders/PanelOrders';
import PanelTickets from '../Panel/Tickets/PanelTickets';
import NotFound404 from '../Other/404';
import LogoLayout from '../layouts/LogoLayout';




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
                <Route path='/panel' element={<PanelHome />} />
                <Route path='accounts' element={
                    <ActivationCheck>
                        <PanelAccounts />
                    </ActivationCheck>
                } />
                <Route path='profile' element={<PanelProfile />} />
                <Route path='plans' element={<PanelPlans />} />
                <Route path='orders' element={<PanelOrders />} />

                <Route path='orders/:order_id' element={<BuyProduct />} />
                <Route path='payment/' element={<PaymentResult />} />



                <Route path='notebook' element={
                    <ActivationCheck>
                        <PanelNotebook />
                    </ActivationCheck>
                } />
                <Route path='tickets' element={
                    <ActivationCheck>
                        <PanelTickets />
                    </ActivationCheck>
                } />

                
                <Route path='tickets/:ticket_id/show' element={<ShowTicket />} />

                <Route path='about' element={<PanelAbout />} />
                <Route path='*' exact={true} element={<Navigate to={"/404"} />} />

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

            <Route path='/admin' element={
                <AuthCkeck>
                    <AdminCheck>
                        <AdmminDashLayout>
                            <Outlet />
                        </AdmminDashLayout>
                    </AdminCheck>
                </AuthCkeck>
            }>


                <Route path='/admin' element={
                    <DashHome />
                } />
                <Route path='products' element={
                    <DashProducts />
                } />
                <Route path='users' element={
                    <DashUsers />
                } />
                <Route path='payments' element={
                    <DashPayments />
                } />
                <Route path='pairs' element={
                    <DashAdminPairs />
                } />
                <Route path='discounts' element={
                    <DashDiscounts />
                } />
                <Route path='orders' element={
                    <DashOrders />
                } />
                <Route path='profile' element={
                    <DashProfile />
                } />
                <Route path='tickets' element={<DashAdminTickets />} />
                <Route path='tickets/:ticket_id/show' element={<ShowAdminTicket />} />

                <Route path='*' exact={true} element={<Navigate to={"/404"} />} />

            </Route>
            <Route path='*' exact={true} element={<Navigate to={"/404"} />} />

            <Route path='404' exact={true} element={ <LogoLayout><NotFound404 /></LogoLayout>} />

        </Routes>

    );
}

export default Tradebook;