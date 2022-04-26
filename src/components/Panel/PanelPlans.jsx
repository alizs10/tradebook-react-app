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
                <h2 className="text-slate-300 text-lg">خرید اشتراک
                </h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 mt-4">


                {plans.map((plan, index) => (
                    <Plan key={plan.id} plan={plan} index={index} length={plans.length} />
                ))}

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