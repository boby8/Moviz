import { combineReducers } from "redux";
import Lists from './list/reducer';

const combineReducerslist = combineReducers({
    Lists
})


const makeRootReducer = (state:any, action:any) => {
    return combineReducerslist(state, action);
  };
  
  export default makeRootReducer;