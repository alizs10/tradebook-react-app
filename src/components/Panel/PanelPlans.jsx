import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getPlans } from '../Services/DataLoader';
import Plan from './Plan';

const PanelPlans = () => {

    const [plans, setPlans] = useState([])

    useEffect(async () => {

        try {
            const { status, data } = await getPlans()

            if (status == 200) {
                let unsortedPlans = data.plans;
                let sortedPlans = unsortedPlans.sort(function(a,b){
                    return (a.price - b.price);
                });
                setPlans(sortedPlans)
            }
        } catch (error) {

        }


    }, [])

    return (
        <Fragment>

            <Helmet>
                <title>اشتراک ها - تریدبوک</title>
            </Helmet>


            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">اشتراک شما:
                    <span className="text-red-400 text-sm mr-1">آزمایشی - یک ماهه</span>
                </h2>
            </div>
            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">خرید اشتراک
                </h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 mt-4">


                {plans.map(plan => (
                    <Plan key={plan.id} plan={plan} />
                ))}

                <div
                    className="col-span-1 py-4 rounded-lg drop-shadow-lg bg-violet-500  text-white flex flex-col gap-y-4 justify-center items-center relative overflow-hidden">

                    <span className="absolute top-3 -left-12 w-36 h-8 bg-white -rotate-45 text-base flex justify-center items-center text-slate-900 drop-shadow-lg">ویژه</span>


                    <div className="pb-4 border-b-2 flex flex-col gap-y-1">
                        <span className="text-4xl  font-bold mr-2">12 ماهه</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-3xl ">200,000</span>
                        <span className="text-sm  text-center">تومان</span>
                    </div>
                    <button
                        className="rounded-lg w-3/4 bg-white text-violet-500 bg px-4 py-2">خرید</button>

                </div>







            </div>


            <div className="flex flex-col gap-y-4 mx-2 mt-4">

                <h2 className="text-slate-300 text-lg">پیغام های سیستم</h2>

                <div className="bg-green-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        اشتراک آزمایشی یک ماهه برای شما فعال شد
                    </p>
                </div>
                <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        <span className="font-bold">توجه:</span>
                        اشتراک آزمایشی یک ماهه برای ارزیابی اپلیکیشن تریدبوک به شما هدیه داده شده است. پس خواهشمندیم
                        نظرات، پیشنهادات و مشکلات این اپلیکیشن را از طریق راه های ارتباطی برای ما ارسال کنید. با سپاس از
                        همراهی شما
                    </p>
                </div>
                <div className="bg-yellow-500 rounded-lg drop-shadow-lg p-2 flex flex-col gap-y-2">
                    <p className="font-semibold text-black text-base">
                        <span className="font-bold">توجه:</span>
                        پس از پایان فاز آزمایشی و منتشر شدن نسخه پایدار اپلیکیشن تریدبوک، لازم است برای استفاده از
                        امکانات آن، اشتراک تهیه کنید.
                    </p>
                </div>

            </div>


        </Fragment>
    );
}

export default PanelPlans;