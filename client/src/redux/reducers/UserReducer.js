import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from "../constants";

const initialState = {
    loading: false,
    user: null,
    error: null
}

export const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST: return { ...state, loading: true, error: null };
        case CREATE_USER_SUCCESS: return { ...state, loading: false, user: action.payload };
        case CREATE_USER_FAIL: return { ...state, loading: false, user: null, error: action.payload };

        default: return state;
    }
}
