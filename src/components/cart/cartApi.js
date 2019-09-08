import ConstantValues from '../constantValues.js';
import qs from 'qs';

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
            console.log(json)
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
            console.log(response)

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
            body['customerId'] = ConstantValues.customerId
            body['outletId'] = ConstantValues.outletId
            body['items'] = ConstantValues.inCart
            body['billDetail'] = ConstantValues.billDetail

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, headers)
            console.log(response)

            return Promise.resolve(response)


        } catch (error) {
            console.log('Data received in cartApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static billDetail = () => {
        ConstantValues.gst = (ConstantValues.totalBasePrice / 100) * 5,
        ConstantValues.totalPayableAmount = ConstantValues.totalBasePrice + ConstantValues.deliveryCharge - ConstantValues.couponValue - ConstantValues.walletBalanceUsed + ConstantValues.gst
        ConstantValues.billDetail = [{
            'totalBasePrice': ConstantValues.totalBasePrice,
            'deliveryCharges': ConstantValues.deliveryCharge,
            'discount': ConstantValues.couponValue,
            'couponId': ConstantValues.couponId,
            'couponCode': ConstantValues.couponCode,
            'couponValue': ConstantValues.couponValue,
            'walletBalanceUsed': ConstantValues.walletBalanceUsed,
            'gst': (ConstantValues.gst).toFixed(2),
            'totalPayableAmount': (ConstantValues.totalPayableAmount).toFixed(2)
        }]
        console.log('ConstantValues.billDetail : ' + JSON.stringify(ConstantValues.billDetail))
    }
    
}