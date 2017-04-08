/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import MapView from 'react-native-maps';

const main_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
const map_styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class GameWalker extends Component {

  state = {
    screen: "main",
    latitude: null,
    longitude: null,
  };

  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(x => {
      this.setState({latitude: x.coords.latitude});
      this.setState({longitude: x.coords.longitude});
    })
  }
  render() {
    if (this.state.screen === "main") {
      return (
        <View style={main_styles.container}>
          <Text style={main_styles.welcome}>
            Welcome to React Native!
          </Text>
          <TouchableNativeFeedback onPress={() => this.setState({screen: "map"})}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          style={{borderRadius: 100}}>
            <View style={{width: 150, height: 150, backgroundColor: 'green', borderRadius: 100}}> 
              <Image
              style={{width: 150, height: 150, borderRadius: 100}}
              source={require('./img/play-button.png')}
              />
            </View>
          </TouchableNativeFeedback>
        </View>)
    } else if (this.state.screen === "map") {
      return(
        <View style ={map_styles.container}>
          <MapView
          style={map_styles.map}
          region={{
            latitude: this.state ? this.state.latitude : 0,
            longitude: this.state ? this.state.longitude : 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          >
          </MapView>
        </View>)
    } else if (this.state.screen === "settings") {
      return <Text>Not yet implemented</Text>
    }
    else {
      return <Text>Uh oh, state is invalid</Text>
    }
  }
}

AppRegistry.registerComponent('GameWalker', () => GameWalker);
