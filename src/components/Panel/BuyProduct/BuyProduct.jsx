import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { notify } from '../../Services/alerts';
import { cancelOrder, checkAndApplyDiscountCode, showOrder, storePayment } from '../../Services/BuyProduct';

const BuyProduct = () => {

    const [checking, setChecking] = useState({ discount: false, cancel: false, payment: false })
    const [order, setOrder] = useState([])
    const [haveDiscount, setHaveDiscount] = useState(false)
    const [planName, setPlanName] = useState("...")
    const [discountCode, setDiscountCode] = useState("")
    const [responseMessage, setResponseMessage] = useState({ status: false, message: "" })

    const { order_id } = useParams();
    const navigate = useNavigate();
    useEffect(async () => {

        
        let unmounted = false;

        if (!unmounted) {
            try {
                const { status, data } = await showOrder(order_id)
    
                if (status == 200) {
                    setOrder(data.order)
                    data.order.discount_id && setHaveDiscount(true)
                    setPlanName(data.plan_name)
                }
    
            } catch (e) {
                var error = Object.assign({}, e);
                navigate(`/panel/plans`)
                if (error.response.status === 422) {
                    navigate(`/panel/plans`)
                    notify('سفارشی وجود ندارد', 'error')
                } else {
                    notify('مشکلی رخ داده است', 'error')
                }
            }
    

        }

        return () => {
            unmounted = true;
        }
    }, [])

    const checkAndApplyDiscount = async () => {
        if (checking.discount) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setChecking({ ...checking, discount: true })

        if (isEmpty(discountCode)) {
            notify("کد تخفیف وارد نشده است", "warning")
            setChecking({ ...checking, discount: false })
            return
        }

        try {
            let discount = { discount_code: discountCode, _method: "PUT" }
            const { status, data } = await checkAndApplyDiscountCode(order.id, discount)

            if (status == 200) {
                setOrder(data.order)
                data.status && setHaveDiscount(true)
                setResponseMessage({ status: true, message: data.response_message })
                if (data.status) {
                    setDiscountCode("")
                    notify(data.response_message, "success")
                } else {
                    notify(data.response_message, "warning")

                }
                setChecking({ ...checking, discount: false })
            }
        } catch (error) {
            setChecking({ ...checking, discount: false })

        }


    }

    const handleCancelOrder = async () => {
        if (checking.cancel) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setChecking({ ...checking, cancel: true })
        try {

            const { status, data } = await cancelOrder(order.id)

            if (status == 200) {
                navigate("/panel/orders")
                notify("سفارش شما با موفقیت لغو شد", "success")
            }
            setChecking({ ...checking, cancel: false })

        } catch (error) {
            setChecking({ ...checking, cancel: false })

        }
    }

    const handlePaymentAndRedirectToGateway = async () => {

        if (checking.payment) {
            notify('سیستم در حال انجام درخواست شما می باشد، صبر کنید', 'warning')
            return
        }
        setChecking({ ...checking, payment: true })

        try {

            const { status, data } = await storePayment(order.id)
            let redirectTo = data.action;

            window.location.href = redirectTo;

        } catch (error) {

        }


    }

    return (
        <Fragment>
            <Helmet>
                <title>ثبت سفارش - تریدبوک</title>
            </Helmet>
            <section className="py-2 mt-3">

                <div className="bg-slate-800 text-slate-400 text-xs md:text-sm flex gap-x-2">
                    <NavLink to={'/panel/plans'} className="py-2 px-4">اشتراک ها</NavLink>
                    <span className="py-2 px-4 bg-slate-300 text-slate-900">خرید اشتراک</span>
                </div>
            </section>



            <section className="grid grid-cols-2 gap-2 mt-4">

                <div
                    className="col-span-2 md:col-span-1 bg-slate-700 text-slate-300 text-sm p-2 mx-2 rounded-lg flex flex-col gap-y-2">

                    <span className="font-bold text-sm border-b-2 pb-2">فاکتور خرید شما</span>

                    <span className="flex justify-between gap-x-2">
                        <span>نام اشتراک: </span>
                        <span>{planName}</span>
                    </span>
                    <span className="flex justify-between gap-x-2">
                        <span>هزینه: </span>
                        <span>{order.amount} تومان</span>
                    </span>
                    <span className="flex justify-between gap-x-2">
                        <span>مالیات (9 درصد): </span>
                        <span>2790 تومان</span>
                    </span>
                    {haveDiscount && (
                        <span className="flex justify-between gap-x-2 text-red-400">
                            <span>تخفیف: </span>
                            <span>{order.discount_amount} تومان</span>
                        </span>
                    )}

                </div>
                <div
                    className="col-span-2 md:col-span-1 bg-slate-700 text-slate-100 p-2 mx-2 rounded-lg flex flex-col gap-y-2">

                    <span className="font-bold text-sm border-b-2 pb-2">کد تخفیف دارید؟</span>

                    <span className="text-xxs text-justify">درصورتی که کد تخفیف شما صحیح باشد، مقدار تخفیف از مبلغ نهایی کسر
                        خواهد شد</span>
                    <div className="flex h-12 w-full">
                        <input type="text" className="p-2 rounded-r-lg w-3/5 lg:w-4/5 text-slate-900 focus:outline-none" value={discountCode} onChange={event => setDiscountCode(event.target.value)} />
                        <button
                            className="px-4 py-2 h-full bg-blue-600 text-slate-100 w-2/5 lg:w-1/5 rounded-l-lg text-xs sm:text-xs" onClick={() => checkAndApplyDiscount()}>
                            {checking.discount ? (
                                <BeatLoader color={'#fff'} loading={checking.discount} size={5} />
                            ) : "اعمال تخفیف"}
                        </button>
                    </div>
                    {responseMessage.status && (
                        <span className="text-xxs text-justify">{responseMessage.message}</span>
                    )}
                </div>
                <div className="col-span-2 bg-slate-300 text-slate-900 p-2 mx-2 rounded-lg flex flex-col gap-y-4">

                    <div className="flex justify-between">
                        <span className="font-bold text-sm">تایید فاکتور</span>
                        <span className="flex justify-between gap-x-2 text-sm">
                            <span>مبلغ نهایی: </span>
                            <span className="font-bold">{order.total_amount} تومان</span>
                        </span>
                    </div>

                    <div className="grid grid-cols-6 gap-2">

                        <button
                            className="col-span-6 md:col-span-5 py-3 h-full bg-emerald-400 text-slate-900 rounded-lg text-xs md:text-base font-bold sm:text-xs" onClick={() => handlePaymentAndRedirectToGateway()}>
                            {checking.payment ? (
                                "در حال انتقال به درگاه پرداخت ..."
                            ) : "تایید و پرداخت"}
                        </button>
                        <button
                            className="col-span-6 md:col-span-1 md:order-first py-3 h-full bg-gray-400 text-slate-900 rounded-lg text-xs md:text-sm sm:text-xs" onClick={() => handleCancelOrder()}>
                            {checking.cancel ? (
                                <BeatLoader color={'#000'} loading={checking.cancel} size={5} />
                            ) : "انصراف"}

                        </button>


                    </div>
                </div>

            </section>
        </Fragment>
    );
}

export default BuyProduct;