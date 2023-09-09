import axios from "axios";
import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS, 
    CLEAR_ERRORS} from "../constants/productConstant";

export const getProduct = () => async (dispatch) => {
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});

        // GET all products from BACKEND
        const data = await axios.get("/api/v1/products");
        // console.log(data.data.data);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data.data.data
        })
    } catch (error) {
        // if unable to get products from Backend
        dispatch ({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        // GET all products from BACKEND
        const data = await axios.get(`/api/v1/products/${id}`);
        // console.log(data.data.data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data.data.product
        })
    } catch (error) {
        // if unable to get products from Backend
        dispatch ({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// CLEARING ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
