import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import ConstantValues from '../constantValues.js';
import qs from 'qs';


const baseURL = ConstantValues.apiUrl


export default class orderApi extends Component {

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

    static async orderBooking() {
        try {
            //url
            const apiUrl = 'orders'
            //body
            const body = {}
            body['customerId'] = ConstantValues.customerId
            body['isAgent'] = ConstantValues.isAgent
            body['outletId'] = ConstantValues.outletId
            body['source'] = 'APP'
            body['items'] = ConstantValues.finalCart
            body['billDetail'] = ConstantValues.billDetail
            body['passengerDetail'] = ConstantValues.passengerDetail
            body['paymentDetail'] = ConstantValues.paymentDetails
            body['agent'] = ConstantValues.agentAction




            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, headers)
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in orderApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async orderHistory() {
        try {
            //url
            const apiUrl = 'orders/history/' + ConstantValues.customerId

            //headers
            const headers = {}
            headers['x-auth-token'] = ConstantValues.token

            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, headers)
            console.log(response)

            return Promise.resolve(response)


        } catch (error) {
            console.log('Data received in orderApi.js catch: ' + error)
            return Promise.reject(error)
        }
    }

}
