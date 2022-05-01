import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../../Services/Pagination';
import { getAllTickets } from '../../Redux/Action/Tickets';
import CreateTicketWindow from './CreateTicketWindow';
import Pagination from './Pagination';
import Ticket from './Ticket';

import { AnimatePresence, motion } from 'framer-motion';

const PanelTickets = () => {

    const [doUserWantCreateTicketWindow, setDoUserWantCreateTicketWindow] = useState(false);
    const tickets = useSelector(state => state.Tickets);

    const [showTickets, setShowTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showTickets, perPage, currentPage));
    const [filterMode, setFilterMode] = useState("all");

    const dispatch = useDispatch()

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllTickets())

        }

        return () => {
            unmounted = true;
        }
    }, [])

    useEffect(() => {

        if (!isEmpty(tickets)) {
            setShowTickets(tickets)
            handleFiltringOnTickets("all")
        }

    }, [tickets])

    useEffect(() => {
        setPagination(paginate(showTickets, 5, currentPage))

    }, [showTickets])

    useEffect(() => {
        setPagination(paginate(showTickets, 5, currentPage))
    }, [currentPage])

    useEffect(() => {
        if (pagination.pages !== 0 && pagination.pages < currentPage) {
            setCurrentPage(pagination.pages)
        }
    }, [pagination.pages])

    const handleFiltringOnTickets = (filter) => {

        let ticketsInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                setShowTickets(tickets)
                break;

            case "open":
                ticketsInstance = structuredClone(tickets)
                let openTickets = ticketsInstance.filter(ticket => ticket.status == 0)
                setFilterMode('open')
                setShowTickets(openTickets)
                break;
            case "close":
                ticketsInstance = structuredClone(tickets)
                let closeTickets = ticketsInstance.filter(ticket => ticket.status == 1)
                setFilterMode('close')
                setShowTickets(closeTickets)
                break;

        }
    }
    return (
        <Fragment>

            <Helmet>
                <title>تیکت های شما - تریدبوک</title>
            </Helmet>


            <div className="mx-2 mt-2 flex justify-between border-b-2 pb-2 items-center">
                <h2 className="text-slate-300 text-lg">تیکت ها</h2>

                <div
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('all')}>همه</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'open' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('open')}>باز</span>
                    <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'close' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('close')}>بسته</span>

                </div>
            </div>
            <div className='mx-2'>
                <button className="mt-4 rounded-lg px-3 py-2 text-sm bg-slate-300 flex gap-x-2 items-center justify-center w-full" onClick={() => setDoUserWantCreateTicketWindow(true)}>
                    <i className="fa-solid fa-plus text-xl text-blue-500"></i>
                    <span className="text-slate-800">ایجاد تیکت جدید</span>
                </button>
            </div>
            <div className="flex flex-col gap-y-2 mx-2 mt-2">

                {pagination.total > 0 ? pagination.sliced_array.map(ticket => (
                    <Ticket key={ticket.id} ticket={ticket} />
                )) : (
                    <span className='text-center text-sm text-slate-500'>شما تیکتی ثبت نکرده اید</span>
                )}

            </div>

            {pagination.total > perPage && (
                <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
            )}

            <AnimatePresence>
                {doUserWantCreateTicketWindow && <CreateTicketWindow setDoUserWantCreateTicketWindow={setDoUserWantCreateTicketWindow} />}
            </AnimatePresence>
            <AnimatePresence>
                {doUserWantCreateTicketWindow && (<motion.div exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full md:w-3/4 h-screen md:w-full backdrop-blur-lg bg-slate-800/70 z-30" onClick={() => setDoUserWantCreateTicketWindow(false)}></motion.div>)}
            </AnimatePresence>
        </Fragment>
    );
}

export default PanelTickets;