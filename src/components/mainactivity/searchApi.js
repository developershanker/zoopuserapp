import ConstantValues from '../constantValues.js';



const baseURL = ConstantValues.apiUrl

export default class searchApi {
                                    //Common Function for calling api
    static async apiCall(apiUrl, method , body = {}, headers = {}) {
        try {
        const option = {
            method : method,
            headers:{
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'                
            }
        }
        
        if (Object.keys(headers).length) {
            option.headers = Object.assign(option.headers, headers);
        }

        if (method == 'POST') {
            if (Object.keys(body).length) {
                option.body = JSON.stringify(body);
            }
        }
        console.log(option)
        const uri = baseURL+apiUrl;

        const response = await fetch(uri, option)
        const json     = await response.json();
        console.log(json)
        return Promise.resolve(json)     
        }
        catch (error) {
            console.log(error)
            return Promise.reject(error)
        }    
    }
     
    static async showTrain(){
        try {
             //url
             const apiUrl='trains'
             //body
            
             //calling api for response
             const response= await this.apiCall(apiUrl, 'GET', {} , {})
             console.log(response)
 
             return Promise.resolve(response)
             
        } catch (error) {
            console.log('Data received in serachApi catch: '+error)
            return Promise.reject(error)
        }
    }
}