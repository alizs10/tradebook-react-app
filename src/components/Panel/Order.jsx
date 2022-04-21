import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {

    let status = "";
    let statusClassName = "";

    switch (`${order.status}`) {
        case "0":
            status = "در انتظار پرداخت";
            statusClassName = "";
            break;
        case "1":
            status = "پرداخت شده";
            statusClassName = "border-emerald-400";
            break;
        case "2":
            status = "لغو شده";
            statusClassName = "border-red-400";
            break;
        case "3":
            status = "پرداخت ناموفق";
            statusClassName = "border-red-400";
            break;

        default:
            break;
    }
    return (
        <Link to={`${order.id}/show`} className={`ticket ${statusClassName}`}>

            <div className="flex justify-between">
                <h3 className="font-bold text-slate-300">{order.plan.name}</h3>
                <span className="text-xxs md:text-xs text-gray-300">{order.order_date}</span>
            </div>

            <p className="text-xs text-slate-400">{`${parseInt(order.total_amount).toLocaleString()} تومان`}</p>

            <div className="flex justify-between">
                <span className="flex gap-x-1 items-center text-gray-500 text-xxxs md:text-xxs">
                    <i className="fa-light fa-tag text-xxs md:text-xs"></i>
                    <span className="">{status}</span>
                </span>
                {order.status == 0 && (
                    <Link to={`${order.id}`} className='px-4 py-2 text-xs border-2 border-emerald-400 text-emerald-400 rounded-lg'>پرداخت کنید</Link>
                )}
            </div>
        </Link>
    );
}

export default Order;