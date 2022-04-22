import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order, setOrder, setDoUserWantOrderDetailsWindow }) => {

    const [status, setStatus] = useState("")
    const [statusClassName, setStatusClassName] = useState("")

    useEffect(() => {
        switch (`${order.status}`) {
            case "0":
                setStatus("در انتظار پرداخت")
                setStatusClassName("")

                break;
            case "1":
                setStatus("پرداخت شده")
                setStatusClassName("border-emerald-400")
                break;
            case "2":
                setStatus("لغو شده")
                setStatusClassName("border-red-400")
                break;
            case "3":
                setStatus("پرداخت ناموفق")
                setStatusClassName("border-red-400")
                break;

            default:
                break;
        }
    }, [])




    const handleShowOrderDetailsWindow = () => {
        setOrder(order)
        setDoUserWantOrderDetailsWindow(true)
    }

    return (


        <div className={`order ${statusClassName}`} onClick={() => handleShowOrderDetailsWindow()}>

            <div className="flex justify-between">
                <h3 className="font-bold text-slate-300">{order.plan.name}</h3>
                <span className="text-xxs md:text-xs text-gray-300">{order.order_date}</span>
            </div>

            <div className="flex justify-between">
                <span className="flex gap-x-1 items-center text-gray-400 text-xs md:text-sm">
                    <i className="fa-light fa-tag text-xxs md:text-base"></i>
                    <span>{status}</span>
                </span>
                {order.status == 0 && (
                    <Link to={`${order.id}`} className="px-4 py-2 text-emerald-400 border-2 border-emerald-400 text-xs rounded-lg">پرداخت
                        <span>43,000 تومان</span></Link>
                )}
            </div>
        </div>
    );
}

export default Order;