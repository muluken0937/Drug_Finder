import { createStore } from "redux";
import { reducers } from "./reducer/reducers";

const store =createStore(reducers)
export default store