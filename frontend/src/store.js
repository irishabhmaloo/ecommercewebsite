import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
});

let initialState = {
    // if something present in cart in local storage
    cart: {
        cartItems: localStorage.getItem("cartItems") ? 
            JSON.parse(localStorage.getItem("CartItems")) :
            [],
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;