import {
     CREATE_USER_FAIL,
     CREATE_USER_REQUEST,
     CREATE_USER_SUCCESS,
     LOGIN_USER_FAIL,
     LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS,
     LOGOUT_USER,
     UPDATE_ADDRESS_FAIL,
     UPDATE_ADDRESS_REQUEST,
     UPDATE_ADDRESS_SUCCESS,
} from "../constants";
import axios from "axios";
export const registerUser = (userdata) => async (dispatch) => {
     try {
          dispatch({ type: CREATE_USER_REQUEST });
          const { data } = await axios.post("http://localhost:3001/register", userdata);
          dispatch({ type: CREATE_USER_SUCCESS, payload: data });
     } catch (err) {
          dispatch({type: CREATE_USER_FAIL,payload:err.response && err.response.data.message? err.response.data.message: err.message});
     }
};
export const loginUser = (userdata) => async (dispatch) => {
     try {
          dispatch({ type: LOGIN_USER_REQUEST })
          const { data } = await axios.post("http://localhost:3001/login", userdata);
          localStorage.setItem("token",data.token)
          dispatch({ type: LOGIN_USER_SUCCESS,payload:data});
     } catch (err) {
          dispatch({type: LOGIN_USER_FAIL, payload: err.response && err.response.data.message?err.response.data.message:err.message});
     }
}

export const logoutUser=()=>(dispatch)=>{
    localStorage.removeItem("token");
    dispatch({type:LOGOUT_USER});
}

export const updateAddress = (addressData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDRESS_REQUEST });

        const token = localStorage.getItem("token");
        const config = {
            headers: {Authorization:token}
        };

        const { data } = await axios.put("http://localhost:3001/user/update-address", addressData, config);

        dispatch({ 
            type: UPDATE_ADDRESS_SUCCESS, 
            payload: { user: data.user } 
        });

    } catch (err) {
        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export const deleteAddress= () => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADDRESS_REQUEST });

        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: token },
        };

        const { data } = await axios.put("http://localhost:3001/user/update-address", {
            address: "",
            city: "",
            state: "",
            pin: null
        }, config);

        dispatch({ 
            type: UPDATE_ADDRESS_SUCCESS, 
            payload: { user: data.user } 
        });

    } catch (err) {
        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};