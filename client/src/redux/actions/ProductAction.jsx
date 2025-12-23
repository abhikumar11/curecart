import axios from "axios";
import {PRODUCT_CREATE_REQUEST,PRODUCT_CREATE_SUCCESS,PRODUCT_CREATE_FAIL, LOAD_PRODUCT_REQUEST, LOAD_PRODUCT_SUCCESS, LOAD_PRODUCT_FAIL} from "../constants"

export const addProduct=(formdata)=>async(dispatch)=>{
        try{
            dispatch({type:PRODUCT_CREATE_REQUEST});
            const {data}=await axios.post("http://localhost:3001/product/add",formdata,{headers:{
                'Content-Type':'multipart/form-data'
            }});
            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data});
        }catch(err){
            dispatch({type:PRODUCT_CREATE_FAIL,payload: err.response?.data.message || err.message});
        }
}
export const getProduct=(filter={})=>async(dispatch)=>{
    try {
        dispatch({type:LOAD_PRODUCT_REQUEST});
        const {data}=await axios.get("http://localhost:3001/product/getall",filter);
        console.log(data)
        dispatch({type:LOAD_PRODUCT_SUCCESS,payload:data});

    } catch (err) {
         dispatch({type:LOAD_PRODUCT_FAIL,payload: err.response?.data.message || err.message});
    }
}