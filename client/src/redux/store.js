import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducer";


const store=createStore(combineReducers({
    userRegister: userRegisterReducer,
    userLogin:userLoginReducer
}),{},applyMiddleware(thunk))

export default store;