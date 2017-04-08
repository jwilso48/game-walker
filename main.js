import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback
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

exports.content = (
<View style={styles.container}>
    <Text style={styles.welcome}>
        Welcome to React Native!
    </Text>
    <TouchableNativeFeedback onPress={to_map_screen}
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
)