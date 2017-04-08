import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

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

import MyHome from './routes/home';
import MyMap from './routes/map';

export default class GameWalker extends Component {

  constructor(props) {
    super(props);
    this.state = {screen: 'map'};
  }

  render() {
    let body;
    if (this.state.screen === "home") {
      body = <MyHome to_map_screen={() => {
        this.setState({screen: "map"})
      }}/>
    } else if (this.state.screen === "map") {
      body = <MyMap to_home_screen={() => {
        this.setState({screen: "home"})
      }}/>
    } else if (this.state.screen === "settings") {
      body = <Text>Not yet implemented</Text>
    }
    else {
      body = <Text>Uh oh, state is invalid</Text>
    }
    return body;
  }
}

AppRegistry.registerComponent('GameWalker', () => GameWalker);
