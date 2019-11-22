import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

const initialState = {
    items: [],
    counter: 0
}

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                counter: state.counter + 1
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                counter: state.counter - 1
            };
        case CLEAR_CART:
            return {
                ...state,
                counter: 0,
                items: []
            };
        default:
            return state;
    }
}

export default counterReducer;