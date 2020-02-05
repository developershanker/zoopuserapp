import ConstantValues from '../constantValues.js';
import qs from 'qs';
import { ToastAndroid } from 'react-native';

const baseURL = ConstantValues.apiUrl

export default class cartApi {
    //Common Function for calling api
    static async apiCall(apiUrl, method, body = {}, headers = {}) {
        try {
            let params = '';
            const option = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            if (Object.keys(headers).length) {
                option.headers = Object.assign(option.headers, headers);
            }

            if (method == 'POST' || method == 'PUT') {
                if (Object.keys(body).length) {
                    option.body = JSON.stringify(body);
                }
            }
            else if (method == 'GET') {
                apiUrl += '?' + qs.stringify(body);
            }




            console.log(option)
            const uri = baseURL + apiUrl;

            console.log('the final uri is:' + uri)

            const response = await fetch(uri, option)
            const json = await response.json();
            // console.log(json)
            return Promise.resolve(json)
        }
        catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    static async getCoupons() {
        try {
            //url
            const apiUrl = 'customers/coupons/' + ConstantValues.customerId
            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, headers)
            // console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in cartApi catch: ' + error)
            return Promise.reject(error)

        }
    }

    static async inCart() {
        try {
            //url
            const apiUrl = 'add-to-cart'
            //body
            const body = {}
            body['source'] = 'APP'
            body['customerId'] = ConstantValues.customerId
            body['outletId'] = ConstantValues.outletId
            body['items'] = ConstantValues.finalCart
            body['passengerDetail'] = ConstantValues.passengerDetail
            body['billDetail'] = ConstantValues.billDetail

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, headers)
            //console.log(response)

            return Promise.resolve(response)


        } catch (error) {
            console.log('Data received in cartApi catch: ' + error)
            return Promise.reject(error)
        }
    }
    static calculateCoupon = () => {
        if (ConstantValues.couponType == 'RATE') {
            ConstantValues.rateDiscount = ((ConstantValues.totalBasePrice / 100) * ConstantValues.couponValue).toFixed(2)
            ConstantValues.discount = ConstantValues.rateDiscount
            console.log(' ConstantValues.rateDiscount : ' + ConstantValues.rateDiscount + 'ConstantValues.discount ::' + ConstantValues.discount)
        } else {
            console.log(' I am in calculateCoupon else part::: ConstantValues.rateDiscount : ' + ConstantValues.rateDiscount)
        }
    }

    static billDetail = () => {

        ConstantValues.gst = (ConstantValues.totalBasePrice / 100) * 5,
            ConstantValues.deliveryCharge = Math.round(ConstantValues.deliveryCharge)
        // console.log('deliveryCharge : ' + ConstantValues.deliveryCharge)
        ConstantValues.totalPayableAmount = ConstantValues.totalBasePrice + ConstantValues.deliveryCharge - ConstantValues.discount + ConstantValues.gst,
            ConstantValues.billDetail = {
                'totalAmount': ConstantValues.totalBasePrice,
                'totalZoopPrice': ConstantValues.totalZoopPrice,
                'deliveryCharge': ConstantValues.zoopdeliveryCharge,
                'deliveryChargeGst': ConstantValues.zoopdeliveryChargegst,
                'deliveryChargeGstRate': ConstantValues.deliveryChargegstRate,
                'discount': ConstantValues.discount,
                'couponId': ConstantValues.couponId,
                'couponCode': ConstantValues.couponCode,
                'couponValue': ConstantValues.couponValue,
                'walletAmount': ConstantValues.walletBalanceUsed,
                'gst': (ConstantValues.gst).toFixed(2),
                'totalPayableAmount': (ConstantValues.totalPayableAmount).toFixed(2)
            }
        console.log('ConstantValues.billDetail : ' + JSON.stringify(ConstantValues.billDetail))

    }

    static resetCart = () => {
        ConstantValues.inCart = []
        ConstantValues.finalCart = []
    }
    static changeCode = (couponCode) => {
        if (couponCode == '') {
            //   this.setState({
            //     textPromoCode: 'Apply Coupon Code'
            //   })
            ConstantValues.appliedCode = 'Apply Coupon Code'
            console.log('couponCode is : ' + couponCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
            //   this.props.navigation.navigate('Cart')
        } else {
            //   this.setState({
            //     textPromoCode: couponCode
            //   })
            ConstantValues.appliedCode = couponCode
            console.log('couponCode is : ' + couponCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
        }
    }

    static checkDiscount = (totalBasePrice, totalZoopPrice) => {
        
        if (ConstantValues.walletBalanceUsed !== 0) {
            console.log('////////-------W.A.L.L.E.T------//////')
            ConstantValues.totalBasePrice = totalBasePrice
            ConstantValues.totalZoopPrice = totalZoopPrice
            cartApi.billDetail()
            if (ConstantValues.totalBasePrice >= 150) {
                console.log('ConstantValues.totalBasePrice [onstantValues.totalBasePrice >= 150:::::]' + ConstantValues.totalBasePrice)
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                cartApi.billDetail()
            } else {
                //total value
                // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                //remove discount
                ConstantValues.walletBalanceUsed = 0
                ConstantValues.couponCode = ''
                ConstantValues.couponValue = 0
                ConstantValues.couponType = ''
                ConstantValues.couponId = 0
                ConstantValues.discount = 0
                ConstantValues.rateDiscount = 0
                ConstantValues.minimumPriceRequired = 0
                ConstantValues.isCouponApplied = false
                ConstantValues.appliedCode = 'Apply Coupon Code'
                cartApi.billDetail()
                console.log('offer removed')
                ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            }
        } else if (ConstantValues.couponType == 'RATE') {
            console.log('/////////-----R.A.T.E------/////')
            if (ConstantValues.totalBasePrice >= ConstantValues.minimumPriceRequired) {
                // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                cartApi.calculateCoupon()
                cartApi.billDetail()
            } else {
                //total value
                // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                //remove discount
                ConstantValues.walletBalanceUsed = 0
                ConstantValues.couponCode = ''
                ConstantValues.couponValue = 0
                ConstantValues.couponType = ''
                ConstantValues.couponId = 0
                ConstantValues.discount = 0
                ConstantValues.rateDiscount = 0
                ConstantValues.minimumPriceRequired = 0
                ConstantValues.isCouponApplied = false
                ConstantValues.appliedCode = 'Apply Coupon Code'
                cartApi.billDetail()
                console.log('offer removed')
                console.log('ConstantValues.minimumPriceRequired :::' + ConstantValues.minimumPriceRequired)
                ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            }
        } else if (ConstantValues.couponType == 'FLAT') {
            console.log('/////////-----F.L.A.T------/////')
            if (ConstantValues.totalBasePrice >= ConstantValues.minimumPriceRequired) {
                // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                cartApi.billDetail()
            } else {
                //total value
                // console.log('incartlength::::[when added]:' + JSON.stringify(inCart))
                ConstantValues.totalBasePrice = totalBasePrice
                ConstantValues.totalZoopPrice = totalZoopPrice
                //remove discount
                ConstantValues.walletBalanceUsed = 0
                ConstantValues.couponCode = ''
                ConstantValues.couponValue = 0
                ConstantValues.couponType = ''
                ConstantValues.couponId = 0
                ConstantValues.discount = 0
                ConstantValues.rateDiscount = 0
                ConstantValues.minimumPriceRequired = 0
                ConstantValues.isCouponApplied = false
                ConstantValues.appliedCode = 'Apply Coupon Code'
                cartApi.billDetail()
                console.log('offer removed')
                console.log('ConstantValues.minimumPriceRequired :::' + ConstantValues.minimumPriceRequired)
                ToastAndroid.show('!!!Offer Removed!!!', ToastAndroid.LONG)
            }
        } else {
            ConstantValues.totalBasePrice = totalBasePrice
            ConstantValues.totalZoopPrice = totalZoopPrice
            cartApi.billDetail()
        }
    }

    static removeCoupon = () => {
        ConstantValues.couponCode = ''
        ConstantValues.couponValue = 0
        ConstantValues.couponType = ''
        ConstantValues.couponId = 0
        ConstantValues.discount = 0
        ConstantValues.rateDiscount = 0
        ConstantValues.isCouponApplied = false
        ConstantValues.appliedCode = 'Apply Coupon Code'
        cartApi.billDetail()
    }

    static resetBillDetail = () => {
        couponCode = ''
        isWalletUsed = false
        couponValue = 0
        couponType = ''
        appliedCode = 'Apply Coupon Code'
        isCouponApplied = false
        totalBasePrice = 0
        totalZoopPrice = 0
        minimumPriceRequired = 0
        couponId = 0
        discount = 0
        walletBalanceUsed = 0
        gst = 0
        deliveryCharge = 0
        deliveryChargegst = 0
        deliveryChargegstRate = 0
        basePriceGstRate = 0
        rateDiscount = 0
        totalPayableAmount = 0
    }
}