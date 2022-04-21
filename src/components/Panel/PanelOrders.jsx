import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrders } from '../Redux/Action/Orders';
import Order from './Order';



const PanelOrders = () => {

    const orders = useSelector(state => state.UserOrders);
    const [showOrders, setShowOrders] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUserOrders())
    }, [])

    useEffect(() => {

        if (!isEmpty(orders)) {
            setShowOrders(orders)
        }

    }, [orders])

    return (
        <Fragment>

            <Helmet>
                <title>سفارشات شما - تریدبوک</title>
            </Helmet>


            <div className="mx-2 mt-4 flex justify-between border-b-2 pb-2">
                <h2 className="text-slate-300 text-lg">سفارشات شما</h2>

            </div>

            <div className="flex flex-col gap-y-2 mx-2 mt-2">

                {showOrders.length >= 1 ? showOrders.map(order => (
                    <Order key={order.id} order={order} />
                )) : (
                    <span className='text-center text-sm text-slate-500'>شما سفارشی ثبت نکرده اید</span>
                )}

            </div>
     
        </Fragment>
    );
}

export default PanelOrders;