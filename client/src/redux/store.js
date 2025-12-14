import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userRegisterReducer } from "./reducers/UserReducer";


const store=createStore(combineReducers({
    userRegister: userRegisterReducer,
}),{},applyMiddleware(thunk))

export default store;