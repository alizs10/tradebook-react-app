import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { SyncLoader } from 'react-spinners';
import { reloadAccount } from '../../Redux/Action/Account';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { getHistoricalRates } from '../../Services/FroexServices';
import { EditTrade } from '../../Services/TradesServices';


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
    const [pairId, setPairId] = useState(trade.pair_id);
    const [selectedOption, setSelectedOption] = useState(trade.pair_name);
    const [margin, setMargin] = useState({});
    const [leverage, setLeverage] = useState(trade.leverage);
    const [contractStatus, setContractStatus] = useState(`${trade.status}`);
    const [contractType, setContractType] = useState(`${trade.contract_type}`);
    const [entryPrice, setEntryPrice] = useState(trade.entry_price);
    const [exitPrice, setExitPrice] = useState(trade.exit_price);
    const [, forceUpdate] = useState("");

    const dispatch = useDispatch();

  

    useEffect(() => {
        if (isEmpty(pairs)) return
        setChecking(false)
    }, [pairs])

    useEffect(() => {
        if (isEmpty(trade)) return

        setMargin(JSON.parse(trade.margin))
    }, [trade])


    const handleEditTrade = async () => {

            const editedTrade = {
                ...trade,
                trade_date: date, pair_id: pairId, margin, leverage, entry_price: entryPrice, exit_price: exitPrice, status: contractStatus, contract_type: contractType, account_id: acc_id, user_id: user.id
            }

            if (accType === 'forex') {
                let base = pairName.split("/")[0]
                let symbol = 'USD';
                let rate = 1

                if (base !== 'USD') {
                    if (base === 'EUR') {
                        const { data } = await getHistoricalRates(date, base, symbol)
                        rate = data.rates[symbol];
                    } else {

                        // state= NZD/CAD  => base = NZD

                        const { data } = await getHistoricalRates(date, 'EUR', `USD,${base}`)
                        let xRate = data.rates['USD'];
                        let yRate = data.rates[base];

                        rate = yRate / xRate;

                    }
                }

                let newMargin = (rate * margin.valume * 100000) / leverage;
                editedTrade.margin.rate = rate;
                editedTrade.margin.margin = newMargin;
            } else {
                let valume = (margin.margin * leverage) / editedTrade.entry_price;
                editedTrade.margin.rate = "";
                editedTrade.margin.valume = valume;
            }

            EditTrade(editedTrade, acc_id).then(function ({ status }) {
                if (status === 200) {
                    dispatch(getAllTrades(acc_id))
                    dispatch(reloadAccount(acc_id))
                    setDoUserNeedEditTradeWindow(false)
                    notify('ترید مورد نظر با موفقیت ویرایش شد', 'success');
                }
            }).catch(function (error) {
                if (error.response.status === 422) {
                    notify('اطلاعات وارد شده صحیح نیست', 'warning');
                } else if (error.response.status >= 500) {
                    notify('خطای سرور', 'error');
                }
            })


        
    }

    const handleMargin = (event) => {
        if (accType === 'crypto') {
            setMargin({ ...margin, margin: event.target.value })
        } else {
            setMargin({ ...margin, valume: event.target.value })
        }
    }

    const displayMargin = margin => {
        return accType === 'crypto' ? margin.margin : margin.valume;
    };

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
                                <label htmlFor="margin">{accType === 'crypto' ? 'مارجین' : 'لات'}</label>
                                <input type="text" className="form-input" value={displayMargin(margin)} onChange={event => {
                                    handleMargin(event);
                                }} id="margin" />
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