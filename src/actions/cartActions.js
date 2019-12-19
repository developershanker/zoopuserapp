import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './types';

export const addToCart = (item) => dispatch => {
    console.log('I am in addtoCart : ' + JSON.stringify(item))
    item.itemCount = item.itemCount + 1
    
    // console.log('I am in addtoCart[item.itemCount] :' + item.itemCount)
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}

export const removeFromCart = (item) => dispatch => {
    console.log('I am in removeFromCart : ' + JSON.stringify(item))
    item.itemCount = item.itemCount - 1
    console.log('I am in removeFromCart[item.itemCount] :' + item.itemCount)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}

export const clearCart = () => dispatch => {
    console.log('I am in clearCart')
    dispatch({
        type: CLEAR_CART
    })
}