import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducer";
import { createProductReducer, loadProductReducer } from "./reducers/ProductReducer";


const store=createStore(combineReducers({
    userRegister: userRegisterReducer,
    userLogin:userLoginReducer,
    newProduct:createProductReducer,
    products:loadProductReducer
}),{},applyMiddleware(thunk))

export default store;