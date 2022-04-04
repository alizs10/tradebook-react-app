import { combineReducers } from "redux";
import { AccountReducer } from "./AccountReducer";
import { AccountsReducer } from "./AccountsReducer";
import { HomeReducer } from "./HomeReducer";
import { NotesReducer } from "./NotesReducer";
import { PairsReducer } from "./PairsReducer";
import { PlansReducer } from "./PlansReducer";
import { StatisticsReducer } from "./StatisticsReducer";
import { TradesReducer } from "./TradesReducer";
import { UserReducer } from "./UserReducer";

export const Reducers = combineReducers({
    User: UserReducer,
    Accounts: AccountsReducer,
    Account: AccountReducer,
    Trades: TradesReducer,
    Pairs: PairsReducer,
    Notes: NotesReducer,
    Statistics: StatisticsReducer,
    HomeData: HomeReducer,
    Plans: PlansReducer
})