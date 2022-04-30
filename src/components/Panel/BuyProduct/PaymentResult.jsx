import React, { Fragment, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { updatePayment } from '../../Services/BuyProduct';


const PaymentResult = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const Authority = searchParams.get("Authority")
    const Status = searchParams.get("Status")

    const [verifying, setVerifying] = useState(true)

    useEffect(async () => {

        let unmounted = false;

        if (!unmounted) {
         
        let payment = {
            Authority, Status
        }
        try {
            const { status, data } = await updatePayment(payment)

            if (status == 200) {
                if (data.status) {
                    console.log("true");
                    setVerifying(false)
                } else {
                    console.log("false");
                    setVerifying(false)
                }
            }
        } catch (error) {
            console.log(error);
            setVerifying(false)
        }
        }

        return () => {
            unmounted = true;
        }
    }, [])


    return (
        <Fragment>
            <Helmet>
                <title>پرداخت - تریدبوک</title>
            </Helmet>
            {verifying ? (
                <div className='flex mt-4 justify-center flex-col gap-y-4 text-center'>
                    <ClipLoader color={'#fff'} loading={verifying} size={55} />
                    <span className='text-center text-slate-300 text-base'>در حال پردازش اطلاعات ...</span>
                </div>
            ) : (
                Status === "OK" ? (
                    <div className='flex justify-center text-center mt-8 flex-col gap-y-4 bg-slate-700 rounded-lg mx-2 py-8'>
                        <span>
                            <i className="fa-regular fa-badge-check text-8xl text-emerald-400"></i>
                        </span>
                        <span className=' font-bold text-emerald-400 text-xl'>پرداخت موفق</span>
                        <span className=' text-slate-300 text-sm'>از خرید شما متشکریم، حساب شما با موفقیت شارژ شد :)</span>
                        <span className=' text-slate-300 text-sm'>شناسه پرداخت: {Authority}</span>
                        <NavLink to={"/panel/"} className="px-4 py-2 text-xs text-emerald-400 border-2 border-emerald-400 rounded-lg block m-auto">برو به خانه</NavLink>
                    </div>) : (
                    <div className='flex justify-center text-center mt-8 flex-col gap-y-4 bg-slate-700 rounded-lg mx-2 py-8'>
                        <span>
                            <i className="fa-regular fa-circle-xmark text-8xl text-red-400"></i>
                        </span>
                        <span className=' font-bold text-red-400 text-xl'>پرداخت ناموفق</span>
                        <span className=' text-slate-300 text-sm'>عملیات پرداخت با خطا مواجه شد :(</span>
                        <span className=' text-slate-300 text-sm'>شناسه پرداخت: {Authority}</span>
                        <NavLink to={"/panel/"} className="px-4 py-2 text-xs text-red-400 border-2 border-red-400 rounded-lg block m-auto">برو به خانه</NavLink>
                    </div>

                )
            )}
        </Fragment>
    );
}

export default PaymentResult;