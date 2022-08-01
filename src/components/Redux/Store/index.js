import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Reducers } from "../Reducer/Reducers";

export const store = createStore(
    Reducers,
    compose(
        applyMiddleware(thunk)
    )
);
