import axios from "axios";
import { ADD_TO_CART, CLEAR_CART, DECREASE_QTY, INCREACE_QTY, REMOVE_PRODUCT } from "../constants";


const updateLocalStorage = (getState) => {
    const {cart}=getState().userCart;
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const addItem=(product)=>(dispatch,getState)=>{
  dispatch({type:ADD_TO_CART,payload:product});
  updateLocalStorage(getState);
}

export const removeItem=(pid)=>(dispatch,getState)=>{
     dispatch({type:REMOVE_PRODUCT,payload:pid});
    updateLocalStorage(getState);
}
export const increaseQty=(pid)=>(dispatch,getState)=>{
    dispatch({type:INCREACE_QTY,payload:pid});
    updateLocalStorage(getState);
}
export const decreaseQty=(pid)=>(dispatch,getState)=>{
     dispatch({type:DECREASE_QTY,payload:pid});
    updateLocalStorage(getState);
}
export const verifyPayment=(paymentData)=>async(dispatch)=>{
  
  try {
      const {data}=await axios.post("http://localhost:3001/payment/verify",paymentData);
      console.log(data);
      if(data.success){
        dispatch({ type:CLEAR_CART});
      localStorage.removeItem("cart");
      return data;
      }
      return {success:false}
  } catch (err) {
    console.error("Payment Verification Error:", err.response?.data?.message);
    return { success: false };
  }
}