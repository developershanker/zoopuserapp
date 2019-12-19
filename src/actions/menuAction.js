import { LOAD_ITEMS_START, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILURE, VEG_MENU, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './types';
import menuApi from '../components/menu/menuApi';
import ConstantValues from '../components/constantValues';
import { ToastAndroid } from 'react-native';
import store from '../store';
import cartApi from '../components/cart/cartApi';



export const getMenu = () => {
    return async (dispatch, getState) => {
        // dispatch({ type: LOAD_ITEMS_START })
        // const response = await menuApi.getMenu()
        try {
            if (ConstantValues.OutletMenuInfo && ConstantValues.OutletMenuInfo.length) {
                    dispatch({ type: LOAD_ITEMS_SUCCESS, payload:ConstantValues.OutletMenuInfo})
                // console.log('I am a response.data.items of menuAction : ' + JSON.stringify(response.data.items))
            } else {
                return (
                    Alert.alert(
                        'Alert!!',
                        'No Items to display.Select another outlet',
                        [
                            {
                                text: 'OK', onPress: () => this.props.navigation.navigate('Station'),
                                style: 'cancel'
                            },
                        ],
                        { cancelable: false },
                    )
                )
            }
        } catch (error) {
            console.log('I am a response of menuAction catch : ' + error)
            dispatch({ type: LOAD_ITEMS_FAILURE, payload: error })
        }
    }
}

export const vegMenu = () => {
    return (dispatch, getState) => {
        let allMenu = new Array()
        allMenu = getState().menuResponse
        const vegMenu = allMenu.filter((item) => {
            return item.categoryId === 1
        })
        dispatch({ type: VEG_MENU, payload: vegMenu })
    }
}


export const addItemToCart = (item) => {
    return (dispatch, getState) => {
        // let allMenu = new Array()
        // allMenu = getState().menuResponse
        let inCart = new Array()
        inCart = getState().cart
        let idx = inCart.findIndex(i => { return i.itemId === item.itemId })
        item.itemCount = item.itemCount + 1
        if (idx > -1) {
            inCart[idx].itemCount = inCart[idx].itemCount + 1
        } else {
            inCart.push(Object.assign({},item))
        }
        let totalCartCount = 0
        let totalBasePrice = 0
        // totalBasePrice = getState().totalBasePrice
        inCart.forEach(i => {
            totalCartCount = totalCartCount + i.itemCount
            totalBasePrice = totalBasePrice  + (i.basePrice * i.itemCount)
            console.log('i.basePrice:[when added]:' + i.basePrice + ':::totalBasePrice :: ' + totalBasePrice)
        })
        const data = {
            inCart : inCart,
            cartLength : totalCartCount,
            totalBasePrice : totalBasePrice
        }
        ConstantValues.totalBasePrice = totalBasePrice
        cartApi.billDetail()
        // console.log('data ::: [when added]:::' + JSON.stringify(data))
        dispatch({ type: ADD_TO_CART, payload: data})
    }
}

export const removeItemFromCart = (item) => {
    return (dispatch,getState) => {
        let inCart = new Array()
        inCart = getState().cart
        let idx = inCart.findIndex(i => { return i.itemId === item.itemId })
        item.itemCount = item.itemCount - 1
        if (idx > -1) {
            if (inCart[idx].itemCount == 1) {
              inCart.splice(idx)
            } else {
              inCart[idx].itemCount = inCart[idx].itemCount - 1;
            }
          }
        let totalCartCount = 0
        let totalBasePrice = 0
        // totalBasePrice = getState().totalBasePrice
        inCart.forEach(i => {
            totalCartCount = totalCartCount + i.itemCount
            totalBasePrice = totalBasePrice  + (i.basePrice * i.itemCount)
            console.log('i.basePrice:[when removed]:' + i.basePrice + '::totalBasePrice :: ' + totalBasePrice)
        })
        const data = {
            inCart: inCart,
            cartLength: totalCartCount,
            totalBasePrice : totalBasePrice
        }
        ConstantValues.totalBasePrice = totalBasePrice
        cartApi.billDetail()
        // console.log('data ::: [when removed]:::' + JSON.stringify(data))
          dispatch({type : REMOVE_FROM_CART , payload : data})
    }
}

export const clearCart = () => {
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_CART })
    }
}