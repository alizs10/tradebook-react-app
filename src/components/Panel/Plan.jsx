import React from 'react';
import { useNavigate } from 'react-router';
import { storeOrder } from '../Services/BuyProduct';

const Plan = ({ plan }) => {

    const navigate = useNavigate();

    const handleCreateOrderAndRedirect = async (plan_id) => {

        try {
            const {status, data} = await storeOrder(plan_id)

            if (status == 200) {

                navigate(`/panel/orders/${data.order.id}`)
                
            }
        } catch (error) {
            
        }




    }
    return (
        <div
            className="col-span-1 py-4 rounded-lg drop-shadow-lg bg-slate-700 text-white flex flex-col gap-y-4 justify-center items-center">


            <div className="pb-4 border-b-2 flex flex-col gap-y-1">
                <span className="text-4xl  font-bold mr-2">{plan.name.replace("اشتراک ", "")}</span>
            </div>
            <div className="flex flex-col gap-y-1">
                <span className="text-3xl ">{parseInt(plan.price).toLocaleString()}</span>
                <span className="text-sm  text-center">تومان</span>
            </div>
            <button
                className="rounded-lg w-3/4 bg-violet-500 px-4 py-2" onClick={() => handleCreateOrderAndRedirect(plan.id)}>خرید</button>

        </div>
    );
}

export default Plan;