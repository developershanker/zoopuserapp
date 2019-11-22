import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Navigation from './src/components/mainactivity/navigation.js'

/////-----------Redux Imports-----------///////////
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './src/store'


export class App extends Component {
    render() {
        return (
           <Provider store={store}>
               <Navigation/>
           </Provider>
        )
    }
}


export default App;