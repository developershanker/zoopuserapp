import ConstantValues from '../constantValues.js';
import qs from 'qs';
import moment from 'moment';

const baseURL = ConstantValues.apiUrl

export default class servicesApi {

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
                if (Object.keys(body).length) {
                    apiUrl += '?' + qs.stringify(body);
                }
                
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

    static async getContactUs(){
        try {
             //url
             const apiUrl = 'contact-us'
             
 
             //calling api for response
             const response = await this.apiCall(apiUrl, 'GET', {}, {})
             console.log(response)
 
             return Promise.resolve(response)
            
        } catch (error) {
            console.log('Data received in serviceApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async sendContent(name,mobile,description){
        try {
            //url
            const apiUrl = 'contact-us'
            //body
            const body = {}
            body['name'] = name
            body['mobile'] = mobile
            body['description'] = description
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in serviceApi catch: ' + error)
            return Promise.reject(error)
        }

    }

    static async sendFeedback(name,email,message){
        try {
            //url
            const apiUrl = 'feedback'
            //body
            const body = {}
            body['name'] = name
            body['email'] = email
            body['message'] = message
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in serviceApi catch: ' + error)
            return Promise.reject(error)
        }
    }
    static async sendBulkRequest(fullName, mobile, email, totalPassenger, journeyDate, pnr, comment){
        try {
            //url
            const apiUrl = 'bulk-orders'
            //body
            const body = {}
            body['fullName'] = fullName
            body['mobile'] = mobile
            body['email'] = email
            body['totalPassenger'] = totalPassenger
            body['journeyDate'] = moment(journeyDate,'DD-MM-YYYY').format('YYYY-MM-DD')
            body['pnr'] = pnr
            body['comment'] = comment
            
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in serviceApi catch: ' + error)
            return Promise.reject(error)
        }
    }
    static async checkAppVersion(versionName){
        try {
            //url
            const apiUrl = 'version-check'
            //body
            const body = {}
            body['versionName'] = versionName
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)
        } catch (error) {
            console.log('Data received in serviceApi catch: ' + error)
            return Promise.reject(error)
        }
    }


}
