import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            // selected item to be placed in cart
            const item = action.payload;

            // if already present in cart
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        // updating with new data    
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    // adding item in cart list
                };
            }


        case REMOVE_CART_ITEM:
            return {
                ...state,
                // every product except the one that should be removed
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};