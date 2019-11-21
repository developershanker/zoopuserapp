import { ADD_TO_CART, REMOVE_FROM_CART , CLEAR_CART } from './types';

export const addToCart = () => dispatch => {
    dispatch({
        type: ADD_TO_CART,
    })
}

export const removeFromCart = () => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART
    })
}

export const clearCart = () => dispatch => {
    dispatch({
        type: CLEAR_CART
    })
}