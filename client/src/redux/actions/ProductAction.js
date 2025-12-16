import axios from "axios";
import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from "../constants"

export const addProduct=(formdata)=>async(dispatch)=>{
        try{
            dispatch({PRODUCT_CREATE_REQUEST});
            const {data}=await axios.post("",formdata,{headers: {
                "Content-Type":"multipart/form-data"
            }});
            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data});
        }catch(err){
            dispatch({type:"PRODUCT_CREATE_FAIL",payload: err.response?.data.message || err.message});
        }
}