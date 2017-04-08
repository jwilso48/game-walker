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
  TouchableNativeFeedback
} from 'react-native';

export default class GameWalker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableNativeFeedback onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        style={{borderRadius: 100}}>
          <View style={{width: 150, height: 150, backgroundColor: 'green', borderRadius: 100}}> 
            <Image
              style={{width: 150, height: 150, borderRadius: 100}}
              source={require('./img/play-button.png')}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('GameWalker', () => GameWalker);
