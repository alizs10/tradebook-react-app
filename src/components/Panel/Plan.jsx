import React from 'react';
import { useNavigate } from 'react-router';
import { storeOrder } from '../Services/BuyProduct';

import { motion } from 'framer-motion';

const Plan = ({ plan, length, index }) => {

    const navigate = useNavigate();

    const handleCreateOrderAndRedirect = async (plan_id) => {

        try {
            const { status, data } = await storeOrder(plan_id)

            if (status == 200) {

                navigate(`/panel/orders/${data.order.id}`)

            }
        } catch (error) {

        }

    }
    return (
        <motion.div animate={{ y: [0, 25, 0] }}
            className={`col-span-1 py-4 rounded-lg drop-shadow-lg ${index + 1 === length ? "bg-violet-500 relative overflow-hidden" : "bg-slate-700"} text-white flex flex-col gap-y-4 justify-center items-center`}>

            {index + 1 === length && (
                <span className="absolute top-3 -left-12 w-36 h-8 bg-white -rotate-45 text-base flex justify-center items-center text-slate-900 drop-shadow-lg">ویژه</span>
            )}
            <div className="pb-4 border-b-2 flex flex-col gap-y-1">
                <span className="text-4xl  font-bold mr-2">{plan.name.replace("اشتراک ", "")}</span>
            </div>
            <div className="flex flex-col gap-y-1">
                <span className="text-3xl ">{parseInt(plan.price).toLocaleString()}</span>
                <span className="text-sm  text-center">تومان</span>
            </div>
            <button
                className={`rounded-lg w-3/4 ${index + 1 === length ? "bg-white text-violet-500" : "bg-violet-500"} px-4 py-2`} onClick={() => handleCreateOrderAndRedirect(plan.id)}>خرید</button>

        </motion.div>
    );
}

export default Plan;