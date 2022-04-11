import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { CreateTrade } from '../../Services/TradesServices';
import { isEmpty } from 'lodash';
import { SyncLoader } from 'react-spinners';
import Select from 'react-select';
import { reloadAccount } from '../../Redux/Action/Account';

const CreateTradeInputWindow = ({ setDoUserNeedCreateTradeWindow, acc_id, accType }) => {

    const dateInstance = new Date();
    const today = dateInstance.getFullYear() + "-" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "-" +
        ("0" + dateInstance.getDate()).slice(-2);

    const [date, setDate] = useState(today);
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
    const [, forceUpdate] = useState("");

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

        console.log('here');
      


            const newTrade = {
                trade_date: date, pair_id: pairId, margin, profit, leverage, entry_price: entryPrice, exit_price: exitPrice, status: contractStatus, contract_type: contractType, account_id: acc_id, user_id: user.id
            }

            console.log(newTrade);

            CreateTrade(newTrade, acc_id).then(function ({ status }) {
                if (status === 201) {
                    dispatch(getAllTrades(acc_id))
                    dispatch(reloadAccount(acc_id))
                    setDoUserNeedCreateTradeWindow(false)
                    notify('ترید جدید شما با موفقیت اضافه شد', 'success');
                }
            }).catch(function (error) {
                if (error.response.status === 422) {
                    notify('اطلاعات وارد شده صحیح نیست', 'warning');
                } else if (error.response.status >= 500) {

                    notify('خطای سرور', 'error');
                }
            })


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
                            <h2 className="text-base">معامله جدید</h2>

                            <button className="p-2 text-base" onClick={() => setDoUserNeedCreateTradeWindow(false)}>
                                <i className="fa-regular fa-xmark"></i>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="date">تاریخ</label>
                                <input type="date" className="form-input" value={date} onChange={event => {
                                    setDate(event.target.value);
                                  
                                }} />
                               
                            </div>

                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="pair_id">جفت ارز</label>
                                <Select

                                    value={displayItem(selectedOption)}
                                    onChange={event => handlePairSelect(event)}
                                    options={pairs[accType]}
                                    styles={customStyles(selectedOption)}
                                />

                                

                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="leverage">لوریج</label>
                                <input type="text" className="form-input" value={leverage} onChange={event => {
                                    setLeverage(event.target.value);
                                }} id="leverage" />
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="contractStatus">وضعیت</label>
                                <select className='form-input' id="contractStatus" value={contractStatus} onChange={event => {
                                    setContractStatus(event.target.value);
                                }}>
                                    <option value="0" >باز</option>
                                    <option value="1" >بسته</option>
                                </select>
                            </div>
                            {(contractStatus == 1 && accType == "forex") ? (
                                <div className="clo-span-1 flex flex-col gap-y-1">
                                    <label htmlFor="profit">سود (دلار)</label>
                                    <input type="text" className="form-input" value={profit} onChange={event => {
                                        setProfit(event.target.value);
                                      
                                    }} id="profit" />
                                    
                                </div>
                            ) : (
                                <div className="clo-span-1 flex flex-col gap-y-1">
                                    <label htmlFor="margin">مارجین</label>
                                    <input type="text" className="form-input" value={margin} onChange={event => {
                                        setMargin(event.target.value);
                                       
                                    }} id="margin" />
                                    
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
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="entryPrice">نقطه ورود</label>
                                <input type="text" className="form-input" value={entryPrice} onChange={event => {
                                    setEntryPrice(event.target.value);
                                }} id="entryPrice" />
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="exitPrice">نقطعه خروج</label>
                                <input type="text" className="form-input" value={exitPrice} onChange={event => {
                                    setExitPrice(event.target.value);
                                }} id="exitPrice" />
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