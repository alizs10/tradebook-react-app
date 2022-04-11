import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { SyncLoader } from 'react-spinners';
import { reloadAccount } from '../../Redux/Action/Account';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { EditTrade } from '../../Services/TradesServices';
import { tradeValidation } from '../../Services/validation';


const EditTradeInputWindow = ({ setDoUserNeedEditTradeWindow, acc_id, trade, accType }) => {

    const [checking, setChecking] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };


    const pairs = useSelector(state => state.Pairs);
    const user = useSelector(state => state.User);

    const tradeDate = new Date(trade.trade_date);
    const justDate = tradeDate.getFullYear() + "-" + ("0" + (tradeDate.getMonth() + 1)).slice(-2) + "-" +
        ("0" + tradeDate.getDate()).slice(-2);


    const [date, setDate] = useState(justDate);
    const [pairName, setPairName] = useState(trade.pair_name);
    const [pairId, setPairId] = useState(`${trade.pair_id}`);
    const [selectedOption, setSelectedOption] = useState(trade.pair_name);
    const [margin, setMargin] = useState(`${trade.margin}`);
    const [profit, setProfit] = useState(trade.profit);
    const [leverage, setLeverage] = useState(`${trade.leverage}`);
    const [contractStatus, setContractStatus] = useState(`${trade.status}`);
    const [contractType, setContractType] = useState(`${trade.contract_type}`);
    const [entryPrice, setEntryPrice] = useState(trade.entry_price);
    const [exitPrice, setExitPrice] = useState(trade.exit_price);
    const [errors, setErrors] = useState({})


    const dispatch = useDispatch();



    useEffect(() => {
        if (isEmpty(pairs)) return
        setChecking(false)
    }, [pairs])


    const handleEditTrade = async () => {

        const editedTrade = {
            accType, id: trade.id, trade_date: date, pair_id: pairId, margin, profit, leverage, entry_price: entryPrice, exit_price: exitPrice, status: contractStatus, contract_type: contractType, account_id: acc_id, user_id: user.id
        }

        const { success, errors } = tradeValidation(editedTrade);
console.log(errors);
        if (success) {
            setErrors({})
            try {
                const { status, data } = await EditTrade(editedTrade, acc_id)

                if (status === 200) {
                    dispatch(getAllTrades(acc_id))
                    dispatch(reloadAccount(acc_id))
                    setDoUserNeedEditTradeWindow(false)
                    notify('ترید مورد نظر با موفقیت ویرایش شد', 'success');
                }
            } catch (e) {
                var error = Object.assign({}, e);

            }
        } else {
            setErrors(errors)
        }

    }

    const handlePairSelect = (event) => {
        setSelectedOption(event.value);
        setPairName(event.value)
        setPairId(event.id)
    }

    const displayItem = selected => {
        const item = pairs[accType].find(x => x.value === selected);
        return item ? item : { value: "", label: "" };
    };

    const customStyles = stateValue => ({
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#fff",
            padding: ".375rem 0",
            border: "2px solid white", borderRadius: "0.5rem"
        }),
        option: styles => ({ ...styles, color: '#000', borderRadius: "0.5rem" }),
    });

    return (
        <Fragment>

            {checking ? (
                <div style={style}>
                    <SyncLoader color={'#ffffff'} loading={checking} size={15} />
                </div>
            ) : (
                <section
                    className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600" >
                    <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                        <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                            <h2 className="text-base">ویرایش معامله</h2>

                            <button className="p-2 text-base" onClick={() => setDoUserNeedEditTradeWindow(false)}>
                                <i className="fa-regular fa-xmark"></i>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="date">تاریخ</label>
                                <input type="date" className="form-input" value={date} onChange={event => {
                                    setDate(event.target.value);

                                }} />
                                {errors.trade_date && (<span className='text-xxs text-red-400'>{errors.trade_date}</span>)}
                            </div>

                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="pair_id">جفت ارز</label>
                                <Select

                                    value={displayItem(selectedOption)}
                                    onChange={event => handlePairSelect(event)}
                                    options={pairs[accType]}
                                    styles={customStyles(selectedOption)}
                                />

                                {errors.pair_id && (<span className='text-xxs text-red-400'>{errors.pair_id}</span>)}

                            </div>

                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="leverage">لوریج</label>
                                <input type="text" className="form-input" value={leverage} onChange={event => {
                                    setLeverage(event.target.value);

                                }} id="leverage" />
                                {errors.leverage && (<span className='text-xxs text-red-400'>{errors.leverage}</span>)}

                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="contractStatus">وضعیت</label>
                                <select className='form-input' id="contractStatus" value={contractStatus} onChange={event => {
                                    setContractStatus(event.target.value);
                                }}>
                                    <option value="0" >باز</option>
                                    <option value="1" >بسته</option>
                                </select>
                                {errors.status && (<span className='text-xxs text-red-400'>{errors.status}</span>)}

                            </div>
                            {(contractStatus == 1 && accType == "forex") ? (
                                <div className="clo-span-1 flex flex-col gap-y-1">
                                    <label htmlFor="profit">سود/زیان (دلار)</label>
                                    <input type="text" className="form-input" value={profit} onChange={event => {
                                        setProfit(event.target.value);
                                    }} id="profit" />
                                    {errors.profit && (<span className='text-xxs text-red-400'>{errors.profit}</span>)}

                                </div>
                            ) : (
                                <div className="clo-span-1 flex flex-col gap-y-1">
                                    <label htmlFor="margin">مارجین</label>
                                    <input type="text" className="form-input" value={margin} onChange={event => {
                                        setMargin(event.target.value);
                                    }} id="margin" />
                                    {errors.margin && (<span className='text-xxs text-red-400'>{errors.margin}</span>)}

                                </div>
                            )}
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="contractType">نوع قرارداد</label>
                                <select className='form-input' id="contractType" value={contractType} onChange={event => {
                                    setContractType(event.target.value);
                                }}>
                                    <option value="0" >لانگ</option>
                                    <option value="1" >شورت</option>
                                </select>
                                {errors.contract_type && (<span className='text-xxs text-red-400'>{errors.contract_type}</span>)}

                            </div>

                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="entryPrice">نقطه ورود</label>
                                <input type="text" className="form-input" value={entryPrice} onChange={event => {
                                    setEntryPrice(event.target.value);
                                }} id="entryPrice" />
                                {errors.entry_price && (<span className='text-xxs text-red-400'>{errors.entry_price}</span>)}

                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="exitPrice">نقطعه خروج</label>
                                <input type="text" className="form-input" value={exitPrice} onChange={event => {
                                    setExitPrice(event.target.value);
                                }} id="exitPrice" />
                                {errors.exit_price && (<span className='text-xxs text-red-400'>{errors.exit_price}</span>)}

                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">

                            <button className="px-4 py-2 rounded-lg text-base bg-yellow-300 text-slate-900 flex justify-center items-center" onClick={() => handleEditTrade()}>
                                <i className="fa-regular fa-edit"></i>
                                <span className='mr-1'>ویرایش</span>
                            </button>
                        </div>

                    </div>
                </section>
            )}


        </Fragment>
    );
}

export default EditTradeInputWindow;