/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/components/mainactivity/navigation.js';
import App from './App.js'
import {name as appName} from './app.json';
//import notifications from './src/components/services/notifications.js';

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerHeadlessTask('notifications', () => notifications)