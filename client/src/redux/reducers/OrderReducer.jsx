import {
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET
} from "../constants";

const initialState = {
    loading: false,
    orders: [],
    error: null
};

export const myOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return { ...state, loading: true };
        case MY_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload, error: null };
        case MY_ORDERS_FAIL:
            return { loading: false, orders: [], error: action.payload };
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { order: {}, loading: false }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
                error: null
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                order: {},
                error: action.payload
            };
        default:
            return state;
    }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            };
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { loading: false, isUpdated: action.payload };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ORDER_RESET:
      return { isUpdated: false };
    default:
      return state;
  }
};