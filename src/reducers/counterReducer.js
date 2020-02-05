import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, LOAD_ITEMS_START, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILURE, VEG_MENU, CHECK_DISCOUNT, GET_USER } from '../actions/types';

const initialState = {
    itemCount: 0,
    showFooter: false,
    menuResponse: [],
    loading: false,
    vegOnly: false,
    cart: [],
    cartLength: 0,
    totalBasePrice: 0,
    error: '',
    total: 0,
    inCartlength: 0,
    counterLoading: false,
    removeDiscount: false,
    response: {}
}

export const counterReducer = (state = initialState, action) => {
    // console.log("I am in counterReducer ::::::::::::::: " + state.menuResponse)
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload.inCart,
                cartLength: action.payload.cartLength,
                totalBasePrice: action.payload.totalBasePrice,
                inCartlength: action.payload.inCartlength,
                removeDiscount: action.payload.removeDiscount,
                showFooter: true,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: action.payload.inCart,
                cartLength: action.payload.cartLength,
                inCartlength: action.payload.inCartlength,
                removeDiscount: action.payload.removeDiscount,
                totalBasePrice: action.payload.totalBasePrice,
            };
        case CLEAR_CART:
            return {
                ...state,
                total: 0,
                cart: [],
                menuResponse: action.payload.menuResponse,
                cartLength: action.payload.cartLength,
                removeDiscount: false,
                totalBasePrice: 0,
            };
        case LOAD_ITEMS_START:
            return {
                ...state,
                loading: true,
            }
        case LOAD_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                menuResponse: action.payload,
                cart: [],
                totalBasePrice: 0
            }
        case LOAD_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case VEG_MENU:
            return {
                ...state,
                menuResponse: action.payload
            }
        case CHECK_DISCOUNT:
            return {
                ...state,
            }
        case GET_USER:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state;
    }
}

export default counterReducer;