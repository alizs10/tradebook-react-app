import React, { Fragment } from 'react';

const DashHome = () => {
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
                        <span className="text-base lg:text-xl font-bold text-blue-600">43</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">کاربران</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-cart-shopping text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">32</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">فروش</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-user-gear  text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">4</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">محصولات</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-sack-dollar text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">1,300,500</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">درآمد</span>
                    </span>

                </div>
                <div className="grid grid-cols-2 items-center rounded-lg shadow bg-white dark:bg-slate-800 p-1 lg:h-20">

                    <span>
                        <i className="fa-light fa-coins text-2xl lg:text-4xl mr-2 text-gray-400"></i>
                    </span>

                    <span className="grid grid-rows-2 text-left ml-2">
                        <span className="text-base lg:text-xl font-bold text-blue-600">3481</span>
                        <span className="text-xs lg:text-base font-light text-gray-600 dark:text-slate-300">جفت ارزها</span>
                    </span>

                </div>

            </section>

            <section className="mt-4 mx-2">

                <div className="flex justify-between">
                    <h2 className="text-xs pb-1 text-gray-600">آخرین
                        فروش
                        ها</h2>

                    <a href="" className="text-xs text-blue-600">مشاهده همه</a>
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
                            <tr className="text-xxs lg:text-base font-light mt-2 py-2 dark:text-slate-300">
                                <td className="py-2 pr-1">1</td>
                                <td className="py-2">حسن روحانی</td>
                                <td className="py-2">اشتراک 1 ماهه</td>
                                <td className="py-2">32 هزارتومان</td>
                                <td className="py-2">
                                    <span
                                        className="py-1 px-2 rounded text-xxxs lg:text-sm bg-red-400 font-semibold text-slate-900">
                                        پرداخت نشده
                                    </span>
                                </td>
                            </tr>
                            <tr className="text-xxs lg:text-base font-light dark:text-slate-300">
                                <td className="py-2 pr-1">2</td>
                                <td className="py-2">امیر تتلو</td>
                                <td className="py-2">اشتراک 1 ماهه</td>
                                <td className="py-2">32 هزارتومان</td>
                                <td className="py-2">
                                    <span
                                        className="py-1 px-2 rounded text-xxxs lg:text-sm bg-red-400 font-semibold text-slate-900">
                                        لغو شده
                                    </span>
                                </td>
                            </tr>
                            <tr className="text-xxs lg:text-base font-light dark:text-slate-300">
                                <td className="py-2 pr-1">3</td>
                                <td className="py-2">استاد اسدی</td>
                                <td className="py-2">اشتراک 1 ساله</td>
                                <td className="py-2">120 هزارتومان</td>
                                <td className="py-2">
                                    <span
                                        className="py-1 px-2 rounded text-xxxs lg:text-sm bg-green-400 font-semibold text-slate-900">
                                        پرداخت شده
                                    </span>
                                </td>
                            </tr>
                        </tbody>


                    </table>



                </section>
            </section>
        </Fragment>

    );
}

export default DashHome;