import { ADD_TO_CART, CLEAR_CART, DECREASE_QTY, INCREACE_QTY, REMOVE_PRODUCT } from "../constants";

const initialState={
    cart:JSON.parse(localStorage.getItem("cart"))||[]
};

export const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART:{
            const exist=state.cart.find(item=>item._id===action.payload._id);
            if(exist){
                return{
                    ...state,cart:state.cart.map(p=>p._id===action.payload._id?
                    {...p,qty:p.qty+1}:p)
                }
            }
            return{
                ...state,cart:[...state.cart,{...action.payload,qty:1}]
            }
        }
        case REMOVE_PRODUCT:
            return {
                ...state,
                cart:state.cart.filter(item=>item._id!==action.payload)
            }
        case INCREACE_QTY:
            return {
                ...state,
        cart:state.cart.map(item =>item._id===action.payload?{...item,qty:item.qty+1}:item)
            }
        case DECREASE_QTY:
            return {
        ...state,
        cart: state.cart.map(item =>item._id===action.payload&&item.qty>1?{...item,qty:item.qty-1}:item)
      }
      case CLEAR_CART:
        return {...state,cart:[]}
      default:return state;
    }
}