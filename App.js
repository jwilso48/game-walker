import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';
import Background from './src/components/Background';		// Background that updates as song changes. Optional (unlikely).
import MyMap from './src/routes/MyMap';
import MySettings from './src/routes/MySettings';
import { StackNavigator } from 'react-navigation';			// For the navigation windows and actions
import Icon from 'react-native-vector-icons/FontAwesome';	// For icons

const Sound = require('react-native-sound');
var curSong = '';

// Layout and actions for the home screen
class HomeScreen extends Component {

	state = {}

	static navigationOptions = {
		title: 'Game Walker',
	};

	constructor(props) {
		super(props);

		this.state = {}

    	this.loopingSound = null;
		this.curSong = '';
    	Sound.setCategory('Ambient', true);

		this.playSoundLooped = () => {
      		if (this.loopingSound) {
        		return;
      		}
      		const s = new Sound(this.curSong, Sound.MAIN_BUNDLE, (e) => {
        		if (e) {
          			console.log('error', e);
        		}
      		});
			s.setNumberOfLoops(-1);
			setTimeout(() => s.play(), 10);
      		this.loopingSound = s;
    	};

		this.stopSoundLooped = () => {
		if (!this.loopingSound) {
			return;
		}
		this.loopingSound.stop().release();
		this.loopingSound = null;
		};

		this.changed = () => {
		if (!this.loopingSound) {
			return;
		}
		this.loopingSound
			.stop()
			.release();
		this.loopingSound = null;

		const s = new Sound(curSong, Sound.MAIN_BUNDLE, (e) => {
			if (e) {
				console.log('error', e);
			}
		});
		s.setNumberOfLoops(-1);
		s.play();
		this.loopingSound = s;
		};

		this.updater = () => {
		// TODO:find location, associate pins with songs in settings ideally, pins would
		// be something like a tree for efficiency, but instead for each of pins p,
		// along with matching song
			this.locSong = 'ocean.mp3';
		// Todo: no song to loc info yet currently, will apply one song to all pins, and
		// overworld song otherwise
		// for (p in this.state.pins) {
		// 	if ((Math.pow((x.coords.latitude - p.latitude), 2) + Math.pow((x.coords.longitude - p.longitude), 2)) < 10) {
		// 	locSong = 'music/wind-waker/1-01 Title.mp3';
		// 	break; //no need to search more
			//if not playing, start
			if (this.curSong === '') {
				this.curSong = this.locSong;
				//if different location song, change
			} else if (this.curSong !== this.locSong) {
				this.curSong = this.locSong;
				this.changed();
			}
		}
		this.updater();

	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				{/*background*/}
					<View style={styles.topBar}>
						<Icon
							name='map-o'
							style={styles.button}
							onPress={() => navigate('Map')}
						/>
						<Text>                                                                              </Text>
						<Icon
							name='cog'
							style={styles.button}
							onPress={() => navigate('Settings')}
						/>
					</View>
					<View style={styles.play}>
						<Icon
						onPress={() => {
							if(this.loopingSound) {
								this.stopSoundLooped();
							} else this.playSoundLooped();
						}}
						name='play-circle' size={175} />
					</View>
					<View style={styles.bottomBar}>
						<Text>Location Name</Text>
						<Text>Song Name</Text>
					</View>
				{/*background*/}
			</View>
		);
	}
}

// Layout and behavior for Settings screen
class SettingsScreen extends Component {
	static navigationOptions = {
		title: 'Settings',
	};
	render() {
		return (
			<MySettings />
			// <Text>Settings!</Text>
		);
	}
}

// Layout and settings for Map page
class MapScreen extends Component {
	static navigationOptions = {
		title: 'Map',
	};
	render() {
		return (
			<MyMap />
		);
	}
}

// Like a directory for the available pages
const GameWalker = StackNavigator({
	Home: { screen: HomeScreen },
	Settings: { screen: SettingsScreen },
	Map: { screen: MapScreen },
});

// Stylesheets. For pretties.
const styles = StyleSheet.create({
	container: {
 	    flex: 1,
 	    justifyContent: 'flex-start',
 	    alignItems: 'center',
    },
	play: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		borderBottomWidth: 125,
		borderColor: 'transparent'
	},
	topBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10
	},
	button: {
		fontSize: 30,
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	bottomBar: {
		alignItems: 'center',
		padding: 30
	}
});

// Exports app for react-native or whatever
AppRegistry.registerComponent('GameWalker', () => GameWalker);