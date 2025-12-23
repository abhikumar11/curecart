import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../constants";

const initialState = {
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    error: null
}

export const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST: return { ...state, loading: true, error: null };
        case CREATE_USER_SUCCESS: return { ...state, loading: false, user: action.payload.msg, token: action.payload.token };
        case CREATE_USER_FAIL: return { ...state, loading: false, user: null, error: action.payload };

        default: return state;
    }
};

export const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST: return { ...state, loading: true, error: null };
        case LOGIN_USER_SUCCESS: return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case LOGIN_USER_FAIL: return { ...state, loading: false, user: null, error: action.payload }
        case LOGOUT_USER: return { ...state, user: null, token: null };
        default: return state;
    }
}
