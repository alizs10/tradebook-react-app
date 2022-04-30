import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { changeTicketStatus, showAdminTicket } from '../../../Services/Admin/AdminTicketsService';
import { useParams } from 'react-router';
import AnswerInput from './AnswerInput';
import { notify } from '../../../Services/alerts';
import Helmet from 'react-helmet';

const ShowAdminTicket = () => {

    const [showTicket, setShowTicket] = useState([]);
    const [status, setStauts] = useState(0);
    const [replays, setReplays] = useState([]);
    const [type, setType] = useState();
    const [doUserWantToReplay, setDoUserWantToReplay] = useState(false);
    const [loading, setLoading] = useState(true)
    const { ticket_id } = useParams()


    const toggleReplayInput = () => {
        doUserWantToReplay ? setDoUserWantToReplay(false) : setDoUserWantToReplay(true)
    }

    useState(async () => {

        let unmounted = false;

        if (!unmounted) {
            const { data, status } = await showAdminTicket(ticket_id)

            if (status == 200) {
                setShowTicket(data.ticket)
                setStauts(data.ticket.status)
                setReplays(data.children)
                switch (`${data.ticket.type}`) {
                    case "0":
                        setType("گزارش مشکل");
                        break;
                    case "1":
                        setType("پیشنهاد");
                        break;
                    case "2":
                        setType("انتقاد");
                        break;
                    case "3":
                        setType("پرسش");
                        break;
                    case "4":
                        setType("دیگر موارد");
                        break;

                    default:
                        break;
                }
                setLoading(false)
            }

        }

        return () => {
            unmounted = true;
        }


    }, [])

    const handleChangeTicketStatus = async () => {

        try {
            const { status, data } = await changeTicketStatus(showTicket.id)

            if (status == 200) {
                setStauts(data.status)
                if (data.status == 1) {
                    notify("تیکت با موفقیت بسته شد", "success")
                } else {
                    notify("تیکت با موفقیت باز شد", "success")
                }

            }
        } catch (error) {
            notify("مشکلی پیش آمده است", "error")
        }


    }


    return (
        !loading && (
            <Fragment>
                <Helmet>
                    <title>مشاهده تیکت - تریدبوک</title>
                </Helmet>
                <div className="mx-2 mt-4 flex justify-between border-b-2 pb-2">
                    <h2 className="text-slate-300 text-lg">{`مشاهده تیکت - "${showTicket.subject}" (${status == 0 ? "باز" : "بسته"})`}</h2>

                    <div className='flex gap-x-1'>
                        <button className="rounded-lg px-3 py-2 text-xs bg-slate-800 flex gap-x-2 items-center" onClick={() => handleChangeTicketStatus()}>
                            <i className="fa-duotone fa-arrows-repeat text-base text-emerald-400"></i>
                            <span className="text-slate-300">{status == 0 ? "بستن تیکت" : "باز کردن تیکت"}</span>
                        </button>
                        <NavLink to={'/admin/tickets'} className="rounded-lg px-3 py-2 text-sm bg-slate-800 flex gap-x-2 items-center">
                            <i className="fa-light fa-turn-down-right text-xl text-blue-500"></i>
                            <span className="text-slate-300">بازگشت</span>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2 mx-2 mt-2">


                    <div className="flex flex-col gap-y-2 p-2 bg-slate-300 rounded-lg relative">

                        <div className="flex justify-between">
                            <h3 className="font-bold text-slate-600">{showTicket.user.name}</h3>
                            <span className="text-xxs md:text-xs text-gray-700">{showTicket.created_at}</span>
                        </div>

                        <p className="text-base text-slate-800 text-justify">{showTicket.body}</p>

                        <div className="flex justify-between">
                            <span className="flex gap-x-1 items-center text-gray-500 text-xxxs md:text-xxs">
                                <i className="fa-light fa-tag text-xxs md:text-xs"></i>
                                <span className="">{type}</span>
                            </span>
                            <span className="text-xxxs md:text-xxs text-blue-500">خوانده شده</span>
                        </div>

                        {(replays.length == 0 & !doUserWantToReplay) ? (

                            <div className="absolute -bottom-10 left-0">
                                <button className="rounded-lg px-3 py-2 text-xs bg-slate-800 flex gap-x-2 items-center" onClick={() => toggleReplayInput()}>
                                    <i className="fa-duotone fa-reply text-base text-blue-500"></i>
                                    <span className="text-slate-300">پاسخ</span>
                                </button>


                            </div>

                        ) : null}

                    </div>


                    {replays.map(replay => (
                        <div className={`flex flex-col gap-y-2 p-2 ${replay.user_id === replay.admin_id ? "bg-emerald-300" : "bg-slate-300"} rounded-lg relative`}>

                            <div className="flex justify-between">
                                <h3 className="font-bold text-slate-600">{replay.user_id == showTicket.user_id ? showTicket.user.name : "پاسخ تیکت (ادمین)"}</h3>
                                <span className="text-xxs md:text-xs text-gray-700">{replay.created_at}</span>
                            </div>

                            <p className="text-base text-slate-800 text-justify">{replay.body}</p>

                            <div className="flex justify-between">
                                <span className="flex gap-x-1 items-center text-gray-500 text-xxxs md:text-xxs">
                                    <i className="fa-light fa-tag text-xxs md:text-xs"></i>
                                    <span className="">پاسخ</span>
                                </span>
                                {replay.user_id == showTicket.user_id && (
                                    <span className="text-xxxs md:text-xxs text-blue-500">{replay.seen == 0 ? "خوانده نشده" : "خوانده شده"}</span>
                                )}
                            </div>

                            {(status == 0 & !doUserWantToReplay) ? (
                                <div className="absolute -bottom-10 left-0">

                                    <button className="w-fit rounded-lg px-3 py-2 text-xs bg-slate-800 flex gap-x-2 items-center" onClick={() => toggleReplayInput()}>
                                        <i className="fa-duotone fa-reply text-base text-blue-500"></i>
                                        <span className="text-slate-300">پاسخ</span>
                                    </button>

                                </div>

                            ) : null}

                        </div>
                    ))}


                    {doUserWantToReplay && (
                        <AnswerInput parent_id={showTicket.id} replays={replays} setReplays={setReplays} toggleReplayInput={toggleReplayInput} />

                    )}

                </div>

            </Fragment>
        )
    );
}

export default ShowAdminTicket;