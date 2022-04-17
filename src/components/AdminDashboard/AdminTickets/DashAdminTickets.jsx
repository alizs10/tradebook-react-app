import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import AdminTicket from './AdminTicket';
import { DeleteAdminTicket, getAllAdminTickets } from '../../Redux/Action/Admin/AdminTickets';
import { destroyAdminTicket } from '../../Services/Admin/AdminTicketsService';

const DashAdminTickets = () => {

    const adminTickets = useSelector(state => state.AdminTickets)
    const [showArr, setShowArr] = useState(adminTickets);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [adminTicket, setAdminTicket] = useState({});
    const [filterMode, setFilterMode] = useState("all");
  
  

    const dispatch = useDispatch()

    useState(() => {
        dispatch(getAllAdminTickets())
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(adminTickets)


    }, [adminTickets])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [showArr])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [currentPage])

    useEffect(() => {
        if (pagination.pages !== 0 && pagination.pages < currentPage) {
            setCurrentPage(pagination.pages)
        }
    }, [pagination.pages])


    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = adminTickets.filter(ticket => ticket.user_email.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(adminTickets)
        }

    }

    const handleFiltringOnTickets = (filter) => {

        let ticketsInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(adminTickets)
                break;

            case "opened":
                ticketsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(adminTickets)
                let availableTickets = ticketsInstance.filter(ticket => ticket.status == 0)
                setFilterMode('opened')
                setShowArr(availableTickets)
                break;
            case "closed":
                ticketsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(adminTickets)
                let unavailableTickets = ticketsInstance.filter(ticket => ticket.status == 1)
                setFilterMode('closed')
                setShowArr(unavailableTickets)
                break;
            case "seen":
                ticketsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(adminTickets)
                let cryptoTickets = ticketsInstance.filter(ticket => ticket.seen == 1)
                setFilterMode('seen')
                setShowArr(cryptoTickets)
                break;
            case "unseen":
                ticketsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(adminTickets)
                let forexTickets = ticketsInstance.filter(ticket => ticket.seen == 0)
                setFilterMode('unseen')
                setShowArr(forexTickets)
                break;
        }
    }

   

    const handleDelAdminTicket = (admin_ticket_id) => {
        confirm('حذف تیکت', 'آیا می خواهید تیکت مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await destroyAdminTicket(admin_ticket_id)

                    if (status === 200) {
                        dispatch(DeleteAdminTicket(admin_ticket_id))
                        notify('تیکت شما با موفقیت حذف شد', 'success');

                    } else {
                        notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                    }
                } catch (error) {
                    notify('مشکلی پیش آمده است، دوباره امتحان کنید', 'error');
                }
            },
            function () {
                notify('درخواست شما لغو شد', 'warning');
            }
        )
    }

    return (
        <Fragment>
            <section className="mt-4 mx-2">


                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">تیکت ها</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'opened' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('opened')}>باز</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'closed' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('closed')}>بسته شده</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'seen' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('seen')}>دیده شده</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unseen' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnTickets('unseen')}>جدید</span>
                    </div>
                </div>
                <div className="mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="grid py-2 grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم کاربر؟ (ایمیل)" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>

                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">ایمیل</th>
                                <th className="py-2">نوع</th>
                                <th className="py-2">وضعیت</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(adminTicket => (
                                <AdminTicket iteration={iteration++} key={adminTicket.id} adminTicket={adminTicket} setAdminTicket={setAdminTicket} handleDelAdminTicket={handleDelAdminTicket} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون تیکت</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            
        </Fragment>
    );
}

export default DashAdminTickets;