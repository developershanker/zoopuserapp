import { LOAD_ITEMS_START, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILURE, VEG_MENU, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, GET_USER } from './types';
import menuApi from '../components/menu/menuApi';
import ConstantValues from '../components/constantValues';
import { ToastAndroid, Alert } from 'react-native';
import store from '../store';
import cartApi from '../components/cart/cartApi';
import loginApi from '../components/login/loginApi';



export const getMenu = () => {
    return async (dispatch, getState) => {
        // dispatch({ type: LOAD_ITEMS_START })
        // const response = await menuApi.getMenu()
        try {
            if (ConstantValues.OutletMenuInfo && ConstantValues.OutletMenuInfo.length) {
                dispatch({ type: LOAD_ITEMS_SUCCESS, payload: ConstantValues.OutletMenuInfo })
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
            // console.log('I am a response of menuAction catch : ' + error)
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
    return async (dispatch, getState) => {
        // let allMenu = new Array()
        // allMenu = getState().menuResponse
        let inCart = new Array()
        inCart = getState().cart
        let idx = inCart.findIndex(i => { return i.itemId === item.itemId })
        item.itemCount = item.itemCount + 1
        // console.log('idx::::: when added : ' + idx)
        if (idx > -1) {
            inCart[idx].itemCount = inCart[idx].itemCount + 1
        } else {
            inCart.push(Object.assign({}, item))
        }
        let totalCartCount = 0
        let totalBasePrice = 0
        let totalZoopPrice = 0
        let removeDiscount = false
        // totalBasePrice = getState().totalBasePrice
        inCart.forEach(i => {
            totalCartCount = totalCartCount + i.itemCount
            totalBasePrice = totalBasePrice + (i.basePrice * i.itemCount)
            totalZoopPrice = totalZoopPrice + (i.zoopPrice * i.itemCount)
            // console.log('i.basePrice:[when added]:' + i.basePrice + ':::totalBasePrice :: ' + totalBasePrice)
        })
        // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
        // ConstantValues.totalBasePrice = totalBasePrice
        // ConstantValues.totalZoopPrice = totalZoopPrice
        // cartApi.billDetail()

        if (ConstantValues.discount != 0) {
            cartApi.checkDiscount(totalBasePrice,totalZoopPrice)
            // if (ConstantValues.walletBalanceUsed === 0) {
            //     ConstantValues.totalBasePrice = totalBasePrice
            //     ConstantValues.totalZoopPrice = totalZoopPrice
            //     cartApi.billDetail()
            //     if (ConstantValues.totalPayableAmount >= ConstantValues.minimumPriceRequired) {
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         removeDiscount = false
            //         cartApi.calculateCoupon()
            //         cartApi.billDetail()
            //     } else {
            //         //total value
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         //remove discount
            //         ConstantValues.walletBalanceUsed = 0
            //         ConstantValues.couponCode = ''
            //         ConstantValues.couponValue = 0
            //         ConstantValues.couponType = ''
            //         ConstantValues.couponId = 0
            //         ConstantValues.discount = 0
            //         ConstantValues.rateDiscount = 0
            //         ConstantValues.minimumPriceRequired = 0
            //         ConstantValues.isCouponApplied = false
            //         ConstantValues.appliedCode = 'Apply Coupon Code'
            //         cartApi.billDetail()
            //         // console.log('offer removed')
            //         removeDiscount = true
            //         console.log('ConstantValues.minimumPriceRequired :::' + ConstantValues.minimumPriceRequired)
            //         ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            //     }
            // } else {
            //     console.log('ConstantValues.walletBalanceUsed [in else of wallet]:::: ' + ConstantValues.walletBalanceUsed)
            //     ConstantValues.totalBasePrice = totalBasePrice
            //     ConstantValues.totalZoopPrice = totalZoopPrice
            //     cartApi.billDetail()

            //     if (ConstantValues.totalBasePrice >= 150) {
            //         console.log('ConstantValues.totalBasePrice [onstantValues.totalBasePrice >= 150:::::]' + ConstantValues.totalBasePrice)
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         removeDiscount = false
            //         cartApi.billDetail()
            //     } else {
            //         //total value
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         //remove discount
            //         ConstantValues.walletBalanceUsed = 0
            //         ConstantValues.couponCode = ''
            //         ConstantValues.couponValue = 0
            //         ConstantValues.couponType = ''
            //         ConstantValues.couponId = 0
            //         ConstantValues.discount = 0
            //         ConstantValues.rateDiscount = 0
            //         ConstantValues.minimumPriceRequired = 0
            //         ConstantValues.isCouponApplied = false
            //         ConstantValues.appliedCode = 'Apply Coupon Code'
            //         cartApi.billDetail()
            //         // console.log('offer removed')
            //         removeDiscount = true
            //         ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            //     }

            // }
        } else {
            // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            ConstantValues.totalBasePrice = totalBasePrice
            ConstantValues.totalZoopPrice = totalZoopPrice
            removeDiscount = false
            cartApi.billDetail()
        }
        console.log('////////ConstantValues.totalPayableAmount OVERALL:::///////' + ConstantValues.totalPayableAmount)
        console.log('////////ConstantValues.minimumPriceRequired OVERALL:::///////' + ConstantValues.minimumPriceRequired)

        const data = {
            inCart: inCart,
            cartLength: totalCartCount,
            totalBasePrice: totalBasePrice,
            inCartlength: inCart.length,
            removeDiscount: removeDiscount,
        }
        // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
        // ConstantValues.totalBasePrice = totalBasePrice
        // ConstantValues.totalZoopPrice = totalZoopPrice
        // cartApi.billDetail()
        // console.log('data ::: [when added]:::' + JSON.stringify(data))
        dispatch({ type: ADD_TO_CART, payload: data })
    }

}

export const removeItemFromCart = (item) => {
    return (dispatch, getState) => {
        let inCart = new Array()
        inCart = getState().cart
        let idx = inCart.findIndex(i => { return i.itemId === item.itemId })
        item.itemCount = item.itemCount - 1
        // console.log('idx::::: when removed : ' + idx)
        if (idx > -1) {
            if (inCart[idx].itemCount == 1) {
                inCart.splice(idx, 1)
            } else {
                inCart[idx].itemCount = inCart[idx].itemCount - 1;
            }
        } else {
            ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
        }
        let totalCartCount = 0
        let totalBasePrice = 0
        let totalZoopPrice = 0
        let removeDiscount = false
        // totalBasePrice = getState().totalBasePrice
        inCart.forEach(i => {
            totalCartCount = totalCartCount + i.itemCount
            totalBasePrice = totalBasePrice + (i.basePrice * i.itemCount)
            totalZoopPrice = totalZoopPrice + (i.zoopPrice * i.itemCount)
            // console.log('incart in remove : ' + JSON.stringify(inCart))
            // console.log('i.basePrice:[when removed]:' + i.basePrice + '::totalBasePrice :: ' + totalBasePrice)
            // console.log('incartlength::::[when removed]:' + JSON.stringify(inCart))
        })

        // ConstantValues.totalBasePrice = totalBasePrice
        // ConstantValues.totalZoopPrice = totalZoopPrice
        // cartApi.billDetail()

        if (ConstantValues.discount != 0) {
            ConstantValues.totalBasePrice = totalBasePrice
            ConstantValues.totalZoopPrice = totalZoopPrice
            cartApi.billDetail()
            cartApi.checkDiscount(totalBasePrice, totalZoopPrice)
            // if (ConstantValues.walletBalanceUsed === 0) {
            //     ConstantValues.totalBasePrice = totalBasePrice
            //     ConstantValues.totalZoopPrice = totalZoopPrice
            //     cartApi.billDetail()
            //     if (ConstantValues.totalPayableAmount >= ConstantValues.minimumPriceRequired) {
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         removeDiscount = false
            //         cartApi.calculateCoupon()
            //         cartApi.billDetail()
            //     } else {
            //         //total value
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         //remove discount
            //         ConstantValues.walletBalanceUsed = 0
            //         ConstantValues.couponCode = ''
            //         ConstantValues.couponValue = 0
            //         ConstantValues.couponType = ''
            //         ConstantValues.couponId = 0
            //         ConstantValues.discount = 0
            //         ConstantValues.rateDiscount = 0
            //         ConstantValues.minimumPriceRequired = 0
            //         ConstantValues.isCouponApplied = false
            //         ConstantValues.appliedCode = 'Apply Coupon Code'
            //         cartApi.billDetail()
            //         // console.log('offer removed')
            //         console.log('ConstantValues.minimumPriceRequired :::' + ConstantValues.minimumPriceRequired)
            //         removeDiscount = true
            //         ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            //     }
            // } else {
            //     console.log('ConstantValues.walletBalanceUsed [in else of wallet]:::: ' + ConstantValues.walletBalanceUsed)
            //     ConstantValues.totalBasePrice = totalBasePrice
            //     ConstantValues.totalZoopPrice = totalZoopPrice
            //     cartApi.billDetail()
            //     if (ConstantValues.totalBasePrice >= 150) {
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         console.log('ConstantValues.totalBasePrice [onstantValues.totalBasePrice >= 150:::::]' + ConstantValues.totalBasePrice)
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         removeDiscount = false
            //         cartApi.billDetail()
            //     } else {
            //         //total value
            //         // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            //         ConstantValues.totalBasePrice = totalBasePrice
            //         ConstantValues.totalZoopPrice = totalZoopPrice
            //         //remove discount
            //         ConstantValues.walletBalanceUsed = 0
            //         ConstantValues.couponCode = ''
            //         ConstantValues.couponValue = 0
            //         ConstantValues.couponType = ''
            //         ConstantValues.couponId = 0
            //         ConstantValues.discount = 0
            //         ConstantValues.rateDiscount = 0
            //         ConstantValues.minimumPriceRequired = 0
            //         ConstantValues.isCouponApplied = false
            //         ConstantValues.appliedCode = 'Apply Coupon Code'
            //         cartApi.billDetail()
            //         // console.log('offer removed')
            //         removeDiscount = true
            //         ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            //     }

            // }
        } else {
            // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
            ConstantValues.totalBasePrice = totalBasePrice
            ConstantValues.totalZoopPrice = totalZoopPrice
            removeDiscount = false
            cartApi.billDetail()
        }
        console.log('////////ConstantValues.totalPayableAmount OVERALL:::///////' + ConstantValues.totalPayableAmount)
        console.log('////////ConstantValues.minimumPriceRequired OVERALL:::///////' + ConstantValues.minimumPriceRequired)

        const data = {
            inCart: inCart,
            cartLength: totalCartCount,
            totalBasePrice: totalBasePrice,
            inCartlength: inCart.length,
            removeDiscount: removeDiscount,
        }
        // console.log('incartlength::::[when removed]:' + inCart.length)
        // ConstantValues.totalBasePrice = totalBasePrice
        // ConstantValues.totalZoopPrice = totalZoopPrice
        // cartApi.billDetail()
        // console.log('data ::: [when removed]:::' + JSON.stringify(data))
        dispatch({ type: REMOVE_FROM_CART, payload: data })
    }
}

export const clearCart = () => {
    return (dispatch, getState) => {
        console.log('I am in Clear cart:::::::::')
        let menuResponse = new Array()
        menuResponse = getState().menuResponse
        menuResponse.forEach(i => {
            i.itemCount = 0
        })
        ConstantValues.inCart = []
        ConstantValues.finalCart = []
        const clearCart = {
            menuResponse:menuResponse,
            cartLength:0,
        }
        dispatch({ type: CLEAR_CART, payload: clearCart })
    }
}

export const getUserInfo = () => {
    return async (dispatch,getState) => {
        const response = await loginApi.getUserRegister();
        try {
            console.log('getUserInfo ::: response in menuaction::' + JSON.stringify(response))
            dispatch({ type : GET_USER , payload : response})
        } catch (error) {
            console.log('getUserInfo ::: error in menuaction::' + JSON.stringify(error))
        }
    }
}