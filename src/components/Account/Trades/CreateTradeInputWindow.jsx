import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { CreateTrade } from '../../Services/TradesServices';
import { isEmpty } from 'lodash';
import { SyncLoader } from 'react-spinners';
import Select from 'react-select';
import { reloadAccount } from '../../Redux/Action/Account';
import { tradeValidation } from '../../Services/validation';

const CreateTradeInputWindow = ({ setDoUserNeedCreateTradeWindow, acc_id, accType }) => {

    const [date, setDate] = useState("");
    const [pairName, setPairName] = useState("");
    const [pairId, setPairId] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [margin, setMargin] = useState("");
    const [profit, setProfit] = useState("");
    const [leverage, setLeverage] = useState("");
    const [contractStatus, setContractStatus] = useState("0");
    const [contractType, setContractType] = useState("0");
    const [entryPrice, setEntryPrice] = useState("");
    const [exitPrice, setExitPrice] = useState("");
    const [errors, setErrors] = useState({})


    const [checking, setChecking] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };


    const pairs = useSelector(state => state.Pairs);
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isEmpty(pairs)) return
        setChecking(false)
    }, [pairs])

    const handleCreateTrade = async () => {


        const newTrade = {
            trade_date: date, pair_id: pairId, margin, profit, leverage, entry_price: entryPrice, exit_price: exitPrice, status: contractStatus, contract_type: contractType, account_id: acc_id, user_id: user.id, accType
        }

        const { success, errors } = tradeValidation(newTrade);
        
        if (success) {
            setErrors({})
            try {
                const { status, data } = await CreateTrade(newTrade, acc_id)

                if (status === 201) {
                    dispatch(getAllTrades(acc_id))
                    dispatch(reloadAccount(acc_id))
                    setDoUserNeedCreateTradeWindow(false)
                    notify('ترید جدید شما با موفقیت اضافه شد', 'success');
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
        setPairId(`${event.id}`)
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
                            <h2 className="text-base">معامله جدید</h2>

                            <button className="p-2 text-base" onClick={() => setDoUserNeedCreateTradeWindow(false)}>
                                <i className="fa-regular fa-xmark"></i>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="date">تاریخ</label>
                                <input type="datetime-local" className="form-input" value={date} onChange={event => {
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
                                <label htmlFor="exitPrice">نقطه خروج</label>
                                <input type="text" className="form-input" value={exitPrice} onChange={event => {
                                    setExitPrice(event.target.value);
                                }} id="exitPrice" />
                                {errors.exit_price && (<span className='text-xxs text-red-400'>{errors.exit_price}</span>)}
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">

                            <button className="px-4 py-2 rounded-lg text-base bg-emerald-400 text-slate-900 flex justify-center items-center" onClick={() => handleCreateTrade()}>
                                <i className="fa-regular fa-circle-check"></i>
                                <span className='mr-1'>ثبت</span>
                            </button>
                        </div>

                    </div>
                </section>
            )}

        </Fragment>
    );
}

export default CreateTradeInputWindow;