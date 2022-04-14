import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTickets } from '../Redux/Action/Tickets';
import CreateTicketWindow from './CreateTicketWindow';
import Ticket from './Ticket';


const PanelTickets = () => {

    const [doUserWantCreateTicketWindow, setDoUserWantCreateTicketWindow] = useState(false);


    const tickets = useSelector(state => state.Tickets);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTickets())
    }, [])



    return (
        <Fragment>

            <Helmet>
                <title>تیکت های شما - تریدبوک</title>
            </Helmet>


            <div className="mx-2 mt-4 flex justify-between border-b-2 pb-2">
                <h2 className="text-slate-300 text-lg">تیکت ها</h2>

                <button className="rounded-lg px-3 py-2 text-sm bg-slate-300 flex gap-x-2 items-center" onClick={() => setDoUserWantCreateTicketWindow(true)}>
                    <i className="fa-solid fa-plus text-xl text-blue-500"></i>
                    <span className="text-slate-800">ایجاد تیکت جدید</span>
                </button>
            </div>

            <div className="flex flex-col gap-y-2 mx-2 mt-2">

                {tickets.length > 0 ? tickets.map(ticket => (
                    <Ticket key={ticket.id} ticket={ticket} />
                )) : (
                    <span className='text-center text-sm text-slate-500'>شما تیکتی ثبت نکرده اید</span>
                )}

            </div>
            {doUserWantCreateTicketWindow && <CreateTicketWindow setDoUserWantCreateTicketWindow={setDoUserWantCreateTicketWindow} />}
            {!doUserWantCreateTicketWindow ? null : (<div className="fixed top-0 left-0 w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => setDoUserWantCreateTicketWindow(false)}></div>)}
        </Fragment>
    );
}

export default PanelTickets;