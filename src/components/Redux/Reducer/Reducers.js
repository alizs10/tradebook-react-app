import { combineReducers } from "redux";
import { AccountReducer } from "./AccountReducer";
import { AccountsReducer } from "./AccountsReducer";
import { AdminHomeReducer } from "./Admin/AdminHomeReducer";
import { AdminPairsReducer } from "./Admin/AdminPairsReducer";
import { AdminTicketsReducer } from "./Admin/AdminTicketsReducer";
import { DiscountsReducer } from "./Admin/DiscountsReducer";
import { OrdersReducer } from "./Admin/OrdersReducer";
import { PaymentsReducer } from "./Admin/PaymentsReducer";
import { PlansReducer } from "./Admin/PlansReducer";
import { UsersReducer } from "./Admin/UsersReducer";
import { HomeReducer } from "./HomeReducer";
import { NotesReducer } from "./NotesReducer";
import { NotificationsReducer } from "./NotificationsReducer";
import { UserOrdersReducer } from "./OrdersReducer";
import { PairsReducer } from "./PairsReducer";
import { StatisticsReducer } from "./StatisticsReducer";
import { TicketsReducer } from "./TicketsReducer";
import { TradesReducer } from "./TradesReducer";
import { UserReducer } from "./UserReducer";


export const Reducers = combineReducers({
    User: UserReducer,
    Accounts: AccountsReducer,
    Account: AccountReducer,
    Trades: TradesReducer,
    Pairs: PairsReducer,
    Notes: NotesReducer,
    Notifications: NotificationsReducer,
    Statistics: StatisticsReducer,
    HomeData: HomeReducer,
    Plans: PlansReducer,
    Users: UsersReducer,
    Payments: PaymentsReducer,
    AdminPairs: AdminPairsReducer,
    Orders: OrdersReducer,
    UserOrders: UserOrdersReducer,
    Discounts: DiscountsReducer,
    AdminHomeData: AdminHomeReducer,
    Tickets: TicketsReducer,
    AdminTickets: AdminTicketsReducer,
})