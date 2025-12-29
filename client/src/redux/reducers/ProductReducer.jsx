import {
    LOAD_PRODUCT_FAIL, LOAD_PRODUCT_REQUEST, LOAD_PRODUCT_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants";

const initialState = {
    loading: false,
    success: false,
    product: null,
    productList: [],
    error: null
};
export const createProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST: return { loading: true };
        case PRODUCT_CREATE_SUCCESS: return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL: return { loading: false, error: action.payload };
        default: return state
    }
}
export const loadProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCT_REQUEST: return { ...state, loading: true };
        case LOAD_PRODUCT_SUCCESS: return { ...state, loading: false, success: true, productList: action.payload };
        case LOAD_PRODUCT_FAIL: return { ...state, loading: false, error: action.payload }

        default: return state;
    }
}
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};