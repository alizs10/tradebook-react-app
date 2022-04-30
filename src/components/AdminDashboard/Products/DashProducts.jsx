import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePlan, getAllPlans } from '../../Redux/Action/Admin/Plans';
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import CreatePlanWindow from './CreatePlanWindow';
import Pagination from './Pagination';
import Plan from './Plan';
import {DestroyPlan} from '../../Services/Admin/PlansServices'
import EditPlanWindow from './EditPlanWindow';
import DetailsPlanWindow from './DetailsPlanWindow';
import Helmet from 'react-helmet';

const DashProducts = () => {

    const plans = useSelector(state => state.Plans)
    const [showArr, setShowArr] = useState(plans);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));
    
    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [plan, setPlan] = useState({});

    const [doUserNeedDetailsPlanWindow, setDoUserNeedDetailsPlanWindow] = useState(false);
    const [doUserNeedEditPlanWindow, setDoUserNeedEditPlanWindow] = useState(false);
    const [doUserNeedCreatePlanWindow, setDoUserNeedCreatePlanWindow] = useState(false);
    const blurConditions = doUserNeedCreatePlanWindow || doUserNeedEditPlanWindow || doUserNeedDetailsPlanWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreatePlanWindow) {
            setDoUserNeedCreatePlanWindow(false)
        } else if (doUserNeedEditPlanWindow) {
            setDoUserNeedEditPlanWindow(false)
        } else {
            setDoUserNeedDetailsPlanWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {


        let unmounted = false;

        if (!unmounted) {
            dispatch(getAllPlans())

        }

        return () => {
            unmounted = true;
        }
        
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(plans)


    }, [plans])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [showArr])

    useEffect(() => {
        setPagination(paginate(showArr, 5, currentPage))
    }, [currentPage])

    var iteration = pagination.startIndex + 1;

    const handleSearchInp = event => {
        setIsUserSearching(true)
        setSearchInp(event.target.value)
        handleSearch(event.target.value)
    }

    const handleSearch = searchFor => {

        let results = plans.filter(product => product.name.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(plans)
        }

    }


    const handleDelPlan = (plan_id) => {
        confirm('حذف محصول', 'آیا می خواهید محصول مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyPlan(plan_id)

                    if (status === 200) {
                        dispatch(DeletePlan(plan_id))
                        if(doUserNeedDetailsPlanWindow) setDoUserNeedDetailsPlanWindow(false)
                        notify('محصول شما با موفقیت حذف شد', 'success');

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
        <Helmet>
        <title>محصولات - تریدبوک</title>
    </Helmet>
            <section className="mt-4 mx-2">

                <h2 className="text-base pb-1 text-gray-600">محصولات</h2>

                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم محصول؟ (نام)" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreatePlanWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">نام محصول</th>
                                <th className="py-2">مدت زمان</th>
                                <th className="py-2">هزینه</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(plan => (

                                <Plan iteration={iteration++} key={plan.id} plan={plan} setPlan={setPlan} handleDelPlan={handleDelPlan} setDoUserNeedEditPlanWindow={setDoUserNeedEditPlanWindow} setDoUserNeedDetailsPlanWindow={setDoUserNeedDetailsPlanWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون محصول</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsPlanWindow ? null : (<DetailsPlanWindow setDoUserNeedDetailsPlanWindow={setDoUserNeedDetailsPlanWindow} plan={plan} handleDelPlan={handleDelPlan} setDoUserNeedEditPlanWindow={setDoUserNeedEditPlanWindow} />)}
            {!doUserNeedEditPlanWindow ? null : (<EditPlanWindow setDoUserNeedEditPlanWindow={setDoUserNeedEditPlanWindow} plan={plan} />)}
            {!doUserNeedCreatePlanWindow ? null : (<CreatePlanWindow setDoUserNeedCreatePlanWindow={setDoUserNeedCreatePlanWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full md:w-3/4 h-screen backdrop-blur-lg bg-slate-800/70 z-20" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashProducts;