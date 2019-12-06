import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid, } from 'react-native';
import ConstantValues from '../constantValues.js';


const baseURL = ConstantValues.apiUrl

export default class searchApi extends Component {
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
            // console.log(json)
            return Promise.resolve(json)
        }
        catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }

    static async showTrain() {
        try {
            //url
            const apiUrl = 'trains'
            //body

            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, {})
            // console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in searchApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async searchBy(searchString) {
        console.log('searchstring length in searchApi.js  : ' + searchString.length )
        try {
            if (searchString.length == 10) {
                ConstantValues.pnr = searchString
                apiUrl = 'search/pnr'
            } else if (searchString.length == 5) {
                ConstantValues.pnr = ''
                apiUrl = 'search/train'
            } else {
                return (
                    ToastAndroid.show('Wrong Input', ToastAndroid.CENTER)
                )
            }
            //url
            // const apiUrl = 'search/train'
            //body
            const body = {}
            body['searchString'] = searchString
            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            console.log(response)

            return Promise.resolve(response)
        } catch (error) {
            console.log('Data received in searchApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async showCuisines() {
        try {
            //url
            const apiUrl = 'cuisines'
            //body

            //calling api for response
            const response = await this.apiCall(apiUrl, 'GET', {}, {})
            console.log(response)

            return Promise.resolve(response)

        } catch (error) {
            console.log('Data received in searchApi catch: ' + error)
            return Promise.reject(error)
        }
    }

    static async research(pnr){
        try {
            //url
            const apiUrl = 'validate-search/pnr'
            //body
            const body = {}
            body['searchString'] = pnr
            body['trainId'] = ConstantValues.trainId
            body['trainNumber'] = ConstantValues.trainNumber
            body['stationId'] = ConstantValues.stationId
            body['stationCode'] = ConstantValues.stationCode
            body['outletId'] = ConstantValues.outletId
            body['deliveryDate'] = ConstantValues.deliveryDate
            //body['orderTime'] = ConstantValues.

            //calling api for response
            const response = await this.apiCall(apiUrl, 'POST', body, {})
            // console.log(response)

            return Promise.resolve(response)
            
        } catch (error) {
            console.log('Data received in searchApi catch: ' + error)
            return Promise.reject(error)
        }
    }
}