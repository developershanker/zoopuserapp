import ConstantValues from '../constantValues.js';



const baseURL = ConstantValues.apiUrl

export default class loginApi {
    //Common Function for calling api
    static async apiCall(apiUrl, method, body = {}, headers = {}) {
        try {
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
            console.log(option)
            const uri = baseURL + apiUrl;

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
    //APIs FOR LOGIN MODULE 
    static async sendOtp(mobile) {
        try {
            //url
            const apiUrl = 'customers/login'
            //body
            const body = {}
            body['mobile'] = mobile
            body['device'] = ConstantValues.device
            body['source'] = ConstantValues.source
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async verifyOtp(customerCode, customerId, mobile) {
        try {
            //url
            const apiUrl = 'customers/verify-otp'
            //body
            const body = {}
            body['customerCode'] = customerCode
            body['customerId'] = customerId
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async resendOtp(mobile, customerId) {
        try {
            //url
            const apiUrl = 'customers/resend-otp'
            //body
            const body = {}
            body['mobile'] = mobile
            body['customerId'] = customerId
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)

        }
    }

    static async getUserRegister() {
        try {
            //url
            const apiUrl = 'customers/' + ConstantValues.customerId
            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token
            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, headers)
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)
        }
    }
    static async getUserRegisterParams(userToken,customerId) {
        try {
            //url
            const apiUrl = 'customers/' + customerId
            //headers
            const headers = {}
            headers['x-auth-token'] = userToken
            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, headers)
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async editUserInfo(name, emailId, alternateMobile ,  referredBy) {
        try {
            //url
            const apiUrl = 'customers/' + ConstantValues.customerId
            //body
            const body = {}
            body['fullName'] = name
            body['email'] = emailId
            body['alternateMobile'] = alternateMobile
            body['referredBy'] = referredBy

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'PUT', body, headers)
            console.log(response)

            return Promise.resolve(response)
        } catch (error) {
            console.log('Data received in loginApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async onRegister() {
        try {
          let response = await loginApi.getUserRegister();
          console.log('data received in register.js : ' + JSON.stringify(response))
          ConstantValues.loginCount = response.data.loginCount
          ConstantValues.customerPhoneNo = response.data.mobile
          ConstantValues.customerName = response.data.fullName
          ConstantValues.customerRefferalCode = response.data.referralCode
        } catch (error) {
          console.log('Data received in register.js catch: ' + error)
        }
      }
}


