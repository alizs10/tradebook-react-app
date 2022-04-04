import { getPlans } from "../../Services/PlansServices";

export const getAllPlans = () => {
    return async dispatch => {
        const { data } = await getPlans();
        await dispatch({ type: "INIT_PLANS", payload: data.plans })
    }
}

export const AddPlan = (plan) => {
    return async (dispatch, getState) => {
        const plans = getState().Plans;
        const plansInstance = [...plans, plan];
        await dispatch({ type: "ADD_PLAN", payload: plansInstance })
    }
}

export const EditPlan = (edited_plan) => {
    return async (dispatch, getState) => {
        const plansInstance = getState().Plans;
        const planIndex = plansInstance.findIndex(plan => plan.id === edited_plan.id)
        let plan = plansInstance[planIndex];
        plan.name = edited_plan.name;
        plan.valid_for = edited_plan.valid_for;
        plan.price = edited_plan.price;

        await dispatch({ type: "UPDATE_PLAN", payload: plansInstance })
    }
}

export const DeletePlan = (plan_id) => {
    return async (dispatch, getState) => {
        const plansInstance = getState().Plans;
        const filteredPlans = plansInstance.filter(ele => ele.id !== plan_id)

        await dispatch({ type: "DELETE_PLAN", payload: filteredPlans })
    }
}