import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import ConstantValues from '../constantValues.js';
import qs from 'qs';


const baseURL = ConstantValues.apiUrl
export default class paymentApi extends Component {
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
            // else if (method == 'GET') {
            //     apiUrl += '?' + qs.stringify(body);
            // }




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

    static async paymentTypes() {
        try {
            //url
            const apiUrl = 'payment-types'


            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, {})
            console.log(response)

            return Promise.resolve(response)


        } catch (error) {
            console.log('Data received in paymentApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async getChecksum(amount,orderId,customerId,callbackUrl) {
        try {
            //url
            const apiUrl = 'payment-gateway'
            //body
            const body = {}
            body['MID'] = ConstantValues.MID
            body['WEBSITE'] = ConstantValues.WEBSITE
            body['CHANNEL_ID'] = ConstantValues.CHANNEL_ID
            body['INDUSTRY_TYPE_ID'] = ConstantValues.INDUSTRY_TYPE_ID
            body['TXN_AMOUNT'] =`${amount}`     //ConstantValues.totalPayableAmount
            body['ORDER_ID'] = orderId    //ConstantValues.zoopOrderId
            body['EMAIL'] = ConstantValues.customerEmailId
            body['MOBILE_NO'] = ConstantValues.customerPhoneNo
            body['CUST_ID'] = customerId        //ConstantValues.customerId
            body['CALLBACK_URL'] = callbackUrl  //ConstantValues.CALLBACK_URL

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, headers)
            console.log(response)

            return Promise.resolve(response)
        } catch (error) {
            console.log('Data received in paymentApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async paymentConfirmation(){
        try {
            //url
            const apiUrl = 'orders/payments/' + ConstantValues.zoopOrderId
            //body
            const body = {}
            body['paymentResponse'] = ConstantValues.gatewayResponse
           // body['orderId'] = ConstantValues.zoopOrderId
            body['transactionId'] = ConstantValues.zooptransactionId
            body['referenceNo'] =  ConstantValues.txnId
            body['status'] = ConstantValues.paymentStatus
            
            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token
            //calling api for response
            const response = await this.apiCall(apiUrl, 'PUT', body, headers)
            console.log(response)

            return Promise.resolve(response)
            
        } catch (error) {
            console.log('Data received in paymentApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async getIrctc(){
        try {
            //url
            const apiUrl = 'orders/irctc-status/' + ConstantValues.zoopOrderId

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token
            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, headers)
            console.log(response)

            return Promise.resolve(response)


        } catch (error) {
            console.log('Data received in paymentApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }
}

