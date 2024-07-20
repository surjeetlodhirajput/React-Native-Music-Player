/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import BackGroundPlayer from './BackGroundPlayer';
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => BackGroundPlayer)