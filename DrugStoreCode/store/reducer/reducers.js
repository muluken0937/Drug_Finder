import { combineReducers } from "redux";
import { pharmacy_id,U_ID, first,last,cartItem,cartReducer,ChangePass,Email } from "./reducer";
export const reducers = combineReducers({
    Cart:cartReducer,
    pharmaID: pharmacy_id,
    User_ID: U_ID,
    FName: first,
    LName:last,
    isChangedPassword:ChangePass,
    userEmail:Email,
    
})