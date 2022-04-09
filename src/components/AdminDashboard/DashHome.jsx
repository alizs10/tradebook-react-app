import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { setAdminHomeData } from '../Redux/Action/Admin/AdminHomeData';
import { getAllPayments } from '../Redux/Action/Admin/Payments';

const DashHome = () => {

    const [loading, setLoading] = useState(true)
    const [homeStat, setAdminHomeStat] = useState({ usersCount: 0, paymentsCount: 0, pairsCount: 0, income: 0, plansCount: 0 })
    const [lastPayments, setLastPayments] = useState([])

    const dispatch = useDispatch()
    const data = useSelector(state => state.AdminHomeData)
    const payments = useSelector(state => state.Payments)

    useEffect(() => {
        dispatch(setAdminHomeData())
        dispatch(getAllPayments())
    }, [])

    useEffect(() => {
        if (isEmpty(data))
            return
        setLoading(false)

        setAdminHomeStat(data.data)
    }, [data])

    useEffect(() => {

        if (!isEmpty(payments)) {
            let slicedPayments = payments.slice(0, 10);
            setLastPayments(slicedPayments)
        }

    }, [payments])

    return (
        <Fragment>

            <section className="mx-2 mt-4 grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">

                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-eye text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">332</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">بازدید ها</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-users text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.usersCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">کاربران</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-cart-shopping text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.paymentsCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">فروش</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-user-gear  text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.plansCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">محصولات</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-sack-dollar text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.income)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">درآمد</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-coins text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">
                            {loading ? (
                                <ClipLoader color={'#fff'} size={15} />
                            ) : (homeStat.pairsCount)}
                        </span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">جفت ارزها</span>
                    </span>

                </div>

            </section>

            <section className="mt-4 mx-2">

                <div className="flex justify-between">
                    <h2 className="text-xs pb-1 text-gray-600">آخرین
                        فروش
                        ها</h2>

                    <Link to="/admin/payments" className="text-xs text-blue-600">مشاهده همه</Link>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">کاربر</th>
                                <th className="py-2">محصول</th>
                                <th className="py-2">پرداخت</th>
                                <th className="py-2">وضعیت</th>
                            </tr>

                        </thead>

                        <tbody>

                            {lastPayments.map((payment, index) => (
                                <tr key={index} className="text-xxs lg:text-base font-light dark:text-slate-300">
                                    <td className="py-2 pr-1">{index + 1}</td>
                                    <td className="py-2">{payment.user.name}</td>
                                    <td className="py-2">{payment.plan_name}</td>
                                    <td className="py-2">{payment.amount}</td>
                                    <td className="py-2">
                                        <span
                                            className={`py-1 px-2 rounded-lg text-xxxs lg:text-sm text-slate-900 ${payment.status == 1 ? "bg-emerald-400" : "bg-red-400"}`}>
                                            {payment.status == 1 ? "موفق" : "ناموفق"}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>

                    {lastPayments.length == 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون پرداخت</span>
                    )}

                </section>
            </section>
        </Fragment>

    );
}

export default DashHome;