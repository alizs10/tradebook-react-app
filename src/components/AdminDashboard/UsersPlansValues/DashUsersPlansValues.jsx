import React, { Fragment, useEffect, useState } from 'react';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import Helmet from 'react-helmet';
import UserPlanValue from './UserPlanValue';
import { getUsersPlansValues } from '../../Services/Admin/DataLoader';

const DashUsersPlansValues = () => {

    const [usersPlansValues, setUsersPlansValues] = useState([]);
    const [showArr, setShowArr] = useState(usersPlansValues);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [filterMode, setFilterMode] = useState("all");

    useState(async () => {

        let unmounted = false;

        if (!unmounted) {
            const { data, status } = await getUsersPlansValues()

            if (status == 200) {
                setUsersPlansValues(await data.users_plans_values)
            }
        }

        return () => {
            unmounted = true;
        }

    }, [])
    useEffect(() => {

        

        let unmounted = false;

        if (!unmounted) {
            if (isUserSearching) {

                handleSearch(searchInp)
                return
            }
    
            setShowArr(usersPlansValues)
    

        }

        return () => {
            unmounted = true;
        }

    }, [usersPlansValues])

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            setPagination(paginate(showArr, 5, currentPage))


        }

        return () => {
            unmounted = true;
        }
    }, [showArr])

    useEffect(() => {
     

        let unmounted = false;

        if (!unmounted) {
            setPagination(paginate(showArr, 5, currentPage))

        }

        return () => {
            unmounted = true;
        }
    }, [currentPage])

    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = showArr.filter(val => val.user_name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(usersPlansValues)
        }

    }

    const handleFiltringOnUsersPlansValues = (filter) => {

        let usersPlansValuesInstance;

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(usersPlansValues)
                break;

            case "have":
                usersPlansValuesInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(usersPlansValues)
                let havePlansUsers = usersPlansValuesInstance.filter(val => val.valid_for > 0)
                setFilterMode('have')
                setShowArr(havePlansUsers)
                break;
            case "havenot":
                usersPlansValuesInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(usersPlansValues)
                let havenotPlansUsers = usersPlansValuesInstance.filter(val => val.valid_for == 0)
                setFilterMode('havenot')
                setShowArr(havenotPlansUsers)
                break;
        }
    }

    return (
        <Fragment>

            <Helmet>
                <title>اشتراک کاربران - تریدبوک</title>
            </Helmet>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">اشتراک کاربران</h2>


                    <div
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsersPlansValues('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'have' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsersPlansValues('have')}>معتبر</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'havenot' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnUsersPlansValues('havenot')}>تمام شده</span>


                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">



                    <input type="text" onChange={event => handleSearchInp(event)}
                        className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                        placeholder="کدوم کاربر؟ (نام)" />
                    <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                        <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                    </div>





                </div>


                <section className="py-2 mt-2 bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">ایمیل</th>
                                <th className="py-2">روزهای باقیمانده</th>
                                <th className="py-2">تاریخ اعتبار</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(val => (

                                <UserPlanValue iteration={iteration++} key={val.id} val={val} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون کاربر</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>

        </Fragment>
    );
}

export default DashUsersPlansValues;