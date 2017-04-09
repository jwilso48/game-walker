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

const Sound = require('react-native-sound');
var curSong = '';	//This is where the current/next song is put.
					//Note, song playing won't update until change is called

export default class MyHome extends Component {

  state = {}

  constructor(props) {
    super(props);
    this.state.to_map_screen = props.to_map_screen;
	this.state.loopingSound = undefined;
	
	Sound.setCategory('Ambient', true);
	
	this.playSoundLooped = () => {
		if (this.state.loopingSound) {
			return;
		}
		const s = new Sound(curSong, Sound.MAIN_BUNDLE, (e) => {
			if (e) {
				console.log('error', e);
			}
			s.setNumberOfLoops(-1);
			s.play();
		});
		this.setState({loopingSound: s});
	};
	
	this.stopSoundLooped = () => {
		if (!this.state.loopingSound) {
			return;
		}
		this.state.loopingSound
			.stop()
			.release();
		this.setState({loopingSound:null});
	};
	
	this.changed = () => {
		if (!this.state.loopingSound) {
			return;
		}
		this.state.loopingSound
			.stop()
			.release();
		this.setState({loopingSound:null});
		
		const s = new Sound(curSong, Sound.MAIN_BUNDLE, (e) => {
			if (e) {
				console.log('error', e);
			}
			s.setNumberOfLoops(-1);
			s.play();
		});
		this.setState({loopingSound:s});
	};
	
//	this.state = {
//		loopingSound: undefined,
//	};
  }

  render() {
    return(
      <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <TouchableNativeFeedback onPress={() => this.setState({screen: "map"})}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          style={{borderRadius: 100}}>
            <View style={{width: 150, height: 150, backgroundColor: 'green', borderRadius: 100}}> 
              <Image
              style={{width: 150, height: 150, borderRadius: 100}}
              source={require('../../img/play-button.png')}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
    )
  }
}