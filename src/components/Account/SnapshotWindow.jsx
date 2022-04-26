import React, { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import { BeatLoader } from 'react-spinners';
import { notify } from '../Services/alerts';

import { motion } from 'framer-motion';

const SnapshotWindow = ({ statistics, setDidUserTakeSnapshot }) => {
    const [loading, setLoading] = useState(true);
    const ref = useRef(null)
    const [image, setImage] = useState(null)
    const [date, setDate] = useState("")
    
    useEffect(() => {
        const node = ref.current;
        const scale = 750 / node.offsetWidth;
        domtoimage.toPng(node, {
            height: node.offsetHeight * scale,
            width: node.offsetWidth * scale,
            style: {
            transform: "scale(" + scale + ")",
            transformOrigin: "top left",
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px"
            }
        }).then(function (dataUrl) {
            const dateInstance = new Date();
            const now = dateInstance.getFullYear() + "-" + ("0" + (dateInstance.getMonth() + 1)).slice(-2) + "-" +
                ("0" + dateInstance.getDate()).slice(-2) + "-" + ("0" + dateInstance.getHours()).slice(-2) + "-" + ("0" + dateInstance.getMinutes()).slice(-2) + "-" + ("0" + dateInstance.getSeconds()).slice(-2);
            setDate(now);
            setImage(dataUrl)

            setLoading(false)
        }).catch(function (error) {
            setDidUserTakeSnapshot(false)
            notify("مشکلی پیش آمده، دوباره امتحان کنید", "error")
        });


    }, [])


    return (
        <motion.div key="modal"
        initial={{ opacity: 0 }} animate={{ y: 25, x: "-50%", opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-0 left-1/2 w-4/5 transform -translate-x-1/2 mt-4 z-50 rounded-lg drop-shadow-lg bg-slate-600">
            <div className="w-full text-slate-100 p-2 flex flex-col gap-y-2">

                <div className="flex justify-between items-center pb-2 border-b-2 border-slate-400">
                    <h2 className="text-base">اسنپ شات</h2>

                    <div className="flex gap-x-2">
                        <a href={image} download={`tradebook-snapshot_${date}.png`} className="p-2 text-lg backdrop-blur-lg bg-slate-900/30 rounded-lg text-emerald-300">
                            {loading ? (
                                <BeatLoader color={'#ffffff'} loading={loading} size={5} />
                            ) : (
                                <span>
                                    <i className="fa-duotone fa-download"></i>
                                    <span className="text-xs mr-1">دریافت</span>
                                </span>
                            )}
                        </a>
                        <button className="p-2 text-base" onClick={() => setDidUserTakeSnapshot(false)}>
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center bg-slate-700 p-2 rounded-lg">

                    <div className="w-full flex justify-center rounded-lg overflow-hidden">
                        {image ? (
                            <img src={image} alt="snapshot" className='rounded-lg' />
                        ) : (
                            <div ref={ref} style={{ width: "600px", height: "400px" }} className="shadow-lg bg-emerald-400 grid grid-cols-2 grid-rows-2 overflow-hidden">

                                <div className="col-span-1 m-2 grid grid-rows-4 gap-y-2">
                                    <span
                                        className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">{Math.floor(statistics.winRatio)}</span>
                                    <span className="row-span-1 text-sm text-center text-slate-900">درصد برد معاملات</span>
                                </div>
                                <div className="col-span-1 m-2 grid grid-rows-4 gap-y-2">
                                    <span
                                        className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex justify-center items-center">{statistics.allTrades}</span>
                                    <span className="row-span-1 text-sm text-center text-slate-900">کل معاملات</span>
                                </div>
                                <div className="col-span-1 m-2 grid grid-rows-4 gap-y-2">
                                    <span style={{ direction: "ltr" }}
                                        className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex flex-col gap-y-1 justify-center items-center">
                                        <span>{`${Math.floor(statistics.bestPnl.value)} %`}</span>
                                        <span className='text-sm'>{statistics.bestPnl.pair_name}</span>
                                    </span>
                                    <span className="row-span-1 text-sm text-center text-slate-900">بیشترین سود</span>
                                </div>
                                <div className="col-span-1 m-2 grid grid-rows-4 gap-y-2">
                                    <span style={{ direction: "ltr" }}
                                        className="row-span-3 bg-slate-300 rounded-lg text-3xl drop-shadow-lg text-slate-900 flex flex-col gap-y-1 justify-center items-center">
                                        <span>{`${Math.floor(statistics.worstPnl.value)} %`}</span>
                                        <span className='text-sm'>{statistics.worstPnl.pair_name}</span>
                                        </span>
                                    <span className="row-span-1 text-sm text-center text-slate-900">بیشترین ضرر</span>
                                </div>

                                <div className="col-span-2 bg-slate-900 flex justify-between items-center px-2 py-3">
                                    <span className="text-base text-slate-300"><span className="text-emerald-300">T</span>rade<span className="text-red-300">B</span>ook.ir</span>
                                    <span className="text-slate-300 text-base">
                                        snapshot
                                    </span>
                                </div>

                            </div>
                        )}


                    </div>

                </div>


            </div>
        </motion.div>
    );
}

export default SnapshotWindow;