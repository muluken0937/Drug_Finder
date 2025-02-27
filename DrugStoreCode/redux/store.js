import { createStore } from 'redux';
import rootReducer from './rootReducer';
import userReducer from './userReducer';


const store = createStore(rootReducer);
export default store;