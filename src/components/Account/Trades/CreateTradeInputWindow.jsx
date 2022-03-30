import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { getHistoricalRates } from '../../Services/FroexServices';
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
    const [margin, setMargin] = useState({ margin: "", rate: "", valume: "" });
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

    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "پر کردن این فیلد الزامی می باشد",
            numeric: "باید عدد وارد کنید",
            in: "باید یک گزینه را انتخاب کنید"
        },
        element: message => <span className='color-red text-size-1'>{message}</span>
    }));

    useEffect(() => {
        if (isEmpty(pairs)) return
        setChecking(false)
    }, [pairs])

    const handleCreateTrade = async () => {


        if (validator.current.allValid()) {


            const newTrade = {
                trade_date: date, pair_id: pairId, margin, leverage, entry_price: entryPrice, exit_price: exitPrice, status: contractStatus, contract_type: contractType, account_id: acc_id, user_id: user.id
            }

            // margin: valume, margin, rate

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
                newTrade.margin.rate = rate;
                newTrade.margin.margin = newMargin;
            } else {
                let valume = (margin.margin * leverage) / newTrade.entry_price;
                newTrade.margin.rate = "";
                newTrade.margin.valume = valume;
            }


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


        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
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
                                    validator.current.showMessageFor('date')
                                }} />
                                {validator.current.message("date", date, "required")}
                            </div>

                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="pair_id">جفت ارز</label>
                                <Select

                                    value={displayItem(selectedOption)}
                                    onChange={event => handlePairSelect(event)}
                                    options={pairs[accType]}
                                    styles={customStyles(selectedOption)}
                                />

                                {validator.current.message("pairId", pairId, "required|numeric")}

                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="margin">{accType === 'crypto' ? 'مارجین' : 'لات'}</label>
                                <input type="text" className="form-input" value={displayMargin(margin)} onChange={event => {
                                    handleMargin(event);
                                    validator.current.showMessageFor('margin')
                                }} id="margin" />
                                {validator.current.message("margin", displayMargin(margin), "required|numeric")}
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="leverage">لوریج</label>
                                <input type="text" className="form-input" value={leverage} onChange={event => {
                                    setLeverage(event.target.value);
                                    validator.current.showMessageFor('leverage')
                                }} id="leverage" />
                                {validator.current.message("leverage", leverage, "required|integer")}
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="contractStatus">وضعیت</label>
                                <select className='form-input' id="contractStatus" value={contractStatus} onChange={event => {
                                    setContractStatus(event.target.value);
                                    validator.current.showMessageFor('contractStatus')
                                }}>
                                    <option value="0" >باز</option>
                                    <option value="1" >بسته</option>
                                </select>
                                {validator.current.message("contractStatus", contractStatus, "required|in:0,1")}
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="contractType">نوع قرارداد</label>
                                <select className='form-input' id="contractType" value={contractType} onChange={event => {
                                    setContractType(event.target.value);
                                    validator.current.showMessageFor('contractType')
                                }}>
                                    <option value="0" >لانگ</option>
                                    <option value="1" >شورت</option>
                                </select>
                                {validator.current.message("contractType", contractType, "required|in:0,1")}
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="entryPrice">نقطه ورود</label>
                                <input type="text" className="form-input" value={entryPrice} onChange={event => {
                                    setEntryPrice(event.target.value);
                                    validator.current.showMessageFor('entryPrice')
                                }} id="entryPrice" />
                                {validator.current.message("entryPrice", entryPrice, "required|numeric")}
                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="exitPrice">نقطعه خروج</label>
                                <input type="text" className="form-input" value={exitPrice} onChange={event => {
                                    setExitPrice(event.target.value);
                                    validator.current.showMessageFor('exitPrice')
                                }} id="exitPrice" />
                                {validator.current.message("exitPrice", exitPrice, "required|numeric")}
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