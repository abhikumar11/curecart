import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducer";
import { createProductReducer, loadProductReducer, productDetailsReducer } from "./reducers/ProductReducer";
import { cartReducer } from "./reducers/CartReducer";
import { allOrdersReducer, myOrdersReducer, orderDetailsReducer, orderUpdateReducer } from "./reducers/OrderReducer";


const store = createStore(combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    newProduct: createProductReducer,
    products: loadProductReducer,
    userCart: cartReducer,
    productDetails: productDetailsReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    orderUpdate: orderUpdateReducer
}), {}, applyMiddleware(thunk))

export default store;