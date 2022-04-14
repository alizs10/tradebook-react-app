import React from 'react';

const Ticket = ({ ticket }) => {

    let type = "";

    switch (`${ticket.type}`) {
        case "0":
            type = "گزارش مشکل";
            break;
        case "1":
            type = "پیشنهاد";
            break;
        case "2":
            type = "انتقاد";
            break;
        case "3":
            type = "پرسش";
            break;
        case "4":
            type = "دیگر موارد";
            break;

        default:
            break;
    }
    return (
        <div className={`ticket ${ticket.status == 1 && "border-emerald-400"}`}>

            <div className="flex justify-between">
                <h3 className="font-bold text-slate-300">{ticket.subject}</h3>
                <span className="text-xxs md:text-xs text-gray-300">{ticket.created_at}</span>
            </div>

            <p className="text-xs text-slate-400">{`${ticket.body.slice(0, 30)} ...`}</p>

            <div className="flex justify-between">
                <span className="flex gap-x-1 items-center text-gray-500 text-xxxs md:text-xxs">
                    <i className="fa-light fa-tag text-xxs md:text-xs"></i>
                    <span className="">{type}</span>
                </span>
                <span className="text-xxxs md:text-xxs text-blue-500">{ticket.seen == 1 ? "خوانده شده" : "خوانده نشده"}</span>
            </div>
        </div>
    );
}

export default Ticket;