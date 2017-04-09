import React, { Component } from 'react';
import {
	AppRegistry,
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';
import BigButton from './src/components/BigButton';
import Background from './src/components/Background';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Game Walker',
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
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
						<Icon name='play-circle' size={150} />
					</View>
					<View alignItems='center'>
						<Text>Location Name</Text>
						<Text>Song Name</Text>
					</View>
			</View>
		);
	}
}

class SettingsScreen extends Component {
	static navigationOptions = {
		title: 'Settings',
	};
	render() {
		return (
			<Text>Settings!</Text>
		);
	}
}

class MapScreen extends Component {
	static navigationOptions = {
		title: 'Map',
	};
	render() {
		return (
			<Text>Map!</Text>
		);
	}
}

const GameWalker = StackNavigator({
	Home: { screen: HomeScreen },
	Settings: { screen: SettingsScreen },
	Map: { screen: MapScreen },
});

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
	},
	topBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		fontSize: 30,
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
	}
});

AppRegistry.registerComponent('GameWalker', () => GameWalker);