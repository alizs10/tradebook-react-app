import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { SyncLoader } from 'react-spinners';
import { reloadAccount } from '../../Redux/Action/Account';
import { getAllTrades } from '../../Redux/Action/Trades';
import { notify } from '../../Services/alerts';
import { UpdatePrice } from '../../Services/TradesServices';

import { motion } from 'framer-motion';

const UpdatePriceWindow = ({ setDoUserNeedUpdatePriceWindow, trades, account_id }) => {

    const [pairs, setPairs] = useState([]);
    const [pairName, setPairName] = useState("");
    const [pairId, setPairId] = useState("");
    const [exitPrice, setExitPrice] = useState("");
    const [, forceUpdate] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [checking, setChecking] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };


    const dispatch = useDispatch()

 
    useEffect(() => {
        if (isEmpty(trades)) return

        let tradesInstance = trades;
        let openTrades = tradesInstance.filter(trade => trade.status === 0)
        let openPairs = []

        openTrades.forEach(openTrade => {
            openPairs.push(openTrade.pair_name)
        });

        var uniqPairs = [...new Set(openPairs)];
        openPairs = [];
        uniqPairs.forEach(uniqPair => {
            let trade = tradesInstance.filter(trade => trade.pair_name === uniqPair)[0]
            openPairs.push({ value: uniqPair, label: uniqPair, id: trade.pair_id })
        })
        setPairs(openPairs)
        setChecking(false)
    }, [trades])

    const handlePairSelect = (event) => {
        setSelectedOption(event.value);
        setPairName(event.value)
        setPairId(event.id)
    }

    const displayItem = selected => {
        const item = pairs.find(x => x.value === selected);
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

    const handleUpdatePrice = async () => {
  

            let updatePrice = {
                pair_id: pairId, exit_price: exitPrice, _method: "PUT"
            }

            const { status } = await UpdatePrice(updatePrice, account_id)

            if (status === 200) {
                dispatch(getAllTrades(account_id))
                dispatch(reloadAccount(account_id))
                setDoUserNeedUpdatePriceWindow(false)
                notify('قیمت فعلی با موفقیت بروزرسانی شد', 'success')
            } else {
                notify('خطا', 'error')
            }
        

    }


    return (
        <Fragment>
            {checking ? (
                <div style={style}>
                    <SyncLoader color={'#ffffff'} loading={checking} size={15} />
                </div>
            ) : (
                <motion.div key="modal"
                initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600" >
                    <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                        <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                            <h2 className="text-base">بروزرسانی قیمت فعلی</h2>

                            <button className="p-2 text-base" onClick={() => setDoUserNeedUpdatePriceWindow(false)}>
                                <i className="fa-regular fa-xmark"></i>
                            </button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="pair_id">جفت ارز</label>
                                <Select
                                    value={displayItem(selectedOption)}
                                    onChange={event => handlePairSelect(event)}
                                    options={pairs}
                                    styles={customStyles(selectedOption)}
                                />


                            </div>
                            <div className="clo-span-1 flex flex-col gap-y-1">
                                <label htmlFor="exitPrice">قیمت فعلی</label>
                                <input type="text" className="form-input" value={exitPrice} onChange={event => {
                                    setExitPrice(event.target.value);
                                }} id="exitPrice" />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">

                            <button className="px-4 py-2 rounded-lg text-base bg-emerald-400 text-slate-900 flex justify-center items-center" onClick={() => handleUpdatePrice()}>
                                <i className="fa-solid fa-arrows-retweet"></i>
                                <span className='mr-1'>بروزرسانی</span>
                            </button>
                        </div>

                    </div>
                </motion.div>
            )}

        </Fragment>
    );
}

export default UpdatePriceWindow;