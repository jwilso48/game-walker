import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Background from './src/components/Background';		// Background that updates as song changes. Optional (unlikely).
// import MyMap from './src/routes/MyMap';
import MySettings from './src/routes/MySettings';
import { StackNavigator } from 'react-navigation';			// For the navigation windows and actions
import Icon from 'react-native-vector-icons/FontAwesome';	// For icons

// Layout and actions for the home screen
class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Game Walker',
	};
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
						<Icon name='play-circle' size={175} />
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
			// <MyMap />
			<Text>Map!</Text>
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