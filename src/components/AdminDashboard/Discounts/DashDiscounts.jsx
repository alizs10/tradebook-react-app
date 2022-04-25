import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteDiscount, getAllDiscounts } from '../../Redux/Action/Admin/Discounts'
import { confirm, notify } from '../../Services/alerts';
import { paginate } from '../../Services/Pagination';
import Pagination from './Pagination';
import { DestroyDiscount } from '../../Services/Admin/DiscountsServices'
import EditDiscountWindow from './EditDiscountWindow';
import DetailsDiscountWindow from './DetailsDiscountWindow';
import Discount from './Discount';
import CreateDiscountWindow from './CreateDiscountWindow';
import Helmet from 'react-helmet';

const DashDiscounts = () => {

    const discounts = useSelector(state => state.Discounts)
    const [showArr, setShowArr] = useState(discounts);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [pagination, setPagination] = useState(paginate(showArr, perPage, currentPage));

    const [searchInp, setSearchInp] = useState("");
    const [searchRes, setSearchRes] = useState([]);
    const [isUserSearching, setIsUserSearching] = useState(false);
    const [discount, setDiscount] = useState({});
    const [filterMode, setFilterMode] = useState("all");

    const [doUserNeedCreateDiscountWindow, setDoUserNeedCreateDiscountWindow] = useState(false);
    const [doUserNeedDetailsDiscountWindow, setDoUserNeedDetailsDiscountWindow] = useState(false);
    const [doUserNeedEditDiscountWindow, setDoUserNeedEditDiscountWindow] = useState(false);
    const blurConditions = doUserNeedCreateDiscountWindow || doUserNeedEditDiscountWindow || doUserNeedDetailsDiscountWindow;
    const handleCloseOpenWindow = () => {
        if (doUserNeedCreateDiscountWindow) {
            setDoUserNeedCreateDiscountWindow(false)
        } else if (doUserNeedEditDiscountWindow) {
            setDoUserNeedEditDiscountWindow(false)
        } else {
            setDoUserNeedDetailsDiscountWindow(false)
        }
    }

    const dispatch = useDispatch()

    useState(() => {
        dispatch(getAllDiscounts())
    }, [])
    useEffect(() => {

        if (isUserSearching) {

            handleSearch(searchInp)
            return
        }

        setShowArr(discounts)


    }, [discounts])

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

        let results = discounts.filter(discount => discount.code.toLowerCase().includes(searchFor.toLowerCase()))
        setSearchRes(results)
        setShowArr(results)

        if (searchFor === "") {
            setIsUserSearching(false)
            setShowArr(discounts)
        }

    }

    const handleFiltringOnDiscounts = (filter) => {

        let discountsInstance;
        const dateInstance = new Date();
        const now = dateInstance.getFullYear() + "-" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "-" +
            ("0" + dateInstance.getDate()).slice(-2) + "-" + ("0" + dateInstance.getHours()).slice(-2) + "-" + ("0" + dateInstance.getMinutes()).slice(-2) + "-" + ("0" + dateInstance.getSeconds()).slice(-2);

        switch (filter) {
            case "all":
                setFilterMode('all')
                isUserSearching ? setShowArr(searchRes) : setShowArr(discounts)
                break;

            case "valid":
                discountsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(discounts)
                let validDiscounts = discountsInstance.filter(discount => discount.exp_date > now || !discount.exp_date)
                setFilterMode('valid')
                setShowArr(validDiscounts)
                break;
            case "unvalid":
                discountsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(discounts)
                let unvalidDiscounts = discountsInstance.filter(discount => discount.exp_date && discount.exp_date < now)
                setFilterMode('unvalid')
                setShowArr(unvalidDiscounts)
                break;
            case "used":
                discountsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(discounts)
                let usedDiscounts = discountsInstance.filter(discount => discount.status == 1)
                setFilterMode('used')
                setShowArr(usedDiscounts)
                break;
            case "unused":
                discountsInstance = isUserSearching ? structuredClone(searchRes) : structuredClone(discounts)
                let unusedDiscounts = discountsInstance.filter(discount => discount.status == 0)
                setFilterMode('unused')
                setShowArr(unusedDiscounts)
                break;

        }
    }
    const handleDelDiscount = (discount_id) => {
        confirm('حذف سفارش', 'آیا می خواهید سفارش مورد نظر را حذف کنید؟.',
            async () => {
                try {
                    const { status } = await DestroyDiscount(discount_id)

                    if (status === 200) {
                        dispatch(DeleteDiscount(discount_id))
                        notify('سفارش موردنظر با موفقیت حذف شد', 'success');

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
                <title>کدهای تخفیف - تریدبوک</title>
            </Helmet>
            <section className="mt-4 mx-2">

                <div className="flex justify-between items-center">
                    <h2 className="text-base pb-1 text-gray-600">کدهای تخفیف</h2>


                    <div
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md flex gap-2 lg:gap-4 items-center">
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'all' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnDiscounts('all')}>همه</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'valid' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnDiscounts('valid')}>معتبر</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unvalid' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnDiscounts('unvalid')}>منقضی</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'used' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnDiscounts('used')}>استفاده شده</span>
                        <span className={`cursor-pointer text-xxxs lg:text-xs ${filterMode === 'unused' ? ' p-2 rounded-lg bg-slate-900' : ''}`} onClick={() => handleFiltringOnDiscounts('unused')}>استفاده نشده</span>

                    </div>
                </div>
                <div className="grid grid-cols-8 gap-2 mt-2 p-2 bg-slate-800 rounded-lg drop-shadow-lg">

                    <div className="col-span-6 md:col-span-7 grid grid-cols-8 bg-slate-700 rounded-lg">

                        <input type="text" onChange={event => handleSearchInp(event)}
                            className="h-full col-span-6 sm:col-span-7 bg-transparent text-sm md:text-lg px-2 focus:outline-none text-slate-300 placeholder:text-slate-500"
                            placeholder="کدوم کد تخفیف؟" />
                        <div className="flex justify-end items-center col-span-2 ml-2 md:ml-3 lg:ml-4 sm:col-span-1">
                            <i className="fa-duotone fa-magnifying-glass text-xl text-slate-500"></i>
                        </div>

                    </div>


                    <button className="col-span-2 md:col-span-1 p-4 text-lg bg-slate-700 rounded-lg" onClick={() => setDoUserNeedCreateDiscountWindow(true)}>
                        <i className="fa-solid fa-plus text-blue-500"></i>
                    </button>
                </div>


                <section className="py-2 mt-2 bg-white dark:bg-slate-800  shadow-md rounded-xl">

                    <table className="border-collapse text-right min-w-full">

                        <thead>
                            <tr
                                className="text-xs lg:text-lg font-semibold border-b border-gray-200 dark:text-slate-500">
                                <th className="py-2 pr-1">#</th>
                                <th className="py-2">کد تخفیف</th>
                                <th className="py-2">نام کاربر</th>
                                <th className="py-2">نام محصول</th>
                                <th className="py-2 hidden sm:block">مقدار</th>
                                <th className="py-2">وضعیت</th>
                                <th className="py-2">عملیات</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagination.sliced_array.map(discount => (

                                <Discount iteration={iteration++} key={discount.id} discount={discount} setDiscount={setDiscount} handleDelDiscount={handleDelDiscount} setDoUserNeedEditDiscountWindow={setDoUserNeedEditDiscountWindow} setDoUserNeedDetailsDiscountWindow={setDoUserNeedDetailsDiscountWindow} />
                            ))}

                        </tbody>


                    </table>

                    {pagination.total === 0 && (
                        <span className='text-sm block mt-2 text-center w-full text-slate-500'>بدون سفارش</span>
                    )}

                    {pagination.total <= perPage ? null : (
                        <Pagination currentPage={currentPage} pages={pagination.pages} setCurrentPage={setCurrentPage} total={pagination.total} startIndex={pagination.startIndex} endIndex={pagination.endIndex} />
                    )}

                </section>
            </section>
            {!doUserNeedDetailsDiscountWindow ? null : (<DetailsDiscountWindow setDoUserNeedDetailsDiscountWindow={setDoUserNeedDetailsDiscountWindow} discount={discount} handleDelDiscount={handleDelDiscount} setDoUserNeedEditDiscountWindow={setDoUserNeedEditDiscountWindow} />)}
            {!doUserNeedEditDiscountWindow ? null : (<EditDiscountWindow setDoUserNeedEditDiscountWindow={setDoUserNeedEditDiscountWindow} discount={discount} />)}
            {!doUserNeedCreateDiscountWindow ? null : (<CreateDiscountWindow setDoUserNeedCreateDiscountWindow={setDoUserNeedCreateDiscountWindow} />)}

            {!blurConditions ? null : (<div className="fixed top-16 left-0 w-full md:w-3/4 h-screen backdrop-blur-lg bg-slate-800/70 z-20" onClick={() => handleCloseOpenWindow()}></div>
            )}
        </Fragment>
    );
}

export default DashDiscounts;