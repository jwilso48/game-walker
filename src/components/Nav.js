import React, { Component } from 'react';
import {
	Text,
	Navigator,
	TouchableHighlight
} from 'react-native';

export default class Nav extends Component {
	render() {
		const routes = [
			{title: 'MyHome', index: 0},
			{title: 'MyMap', index: 1},
			{title: 'MySettings', index: 2}
		];
		return (
			<Navigator
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={(route, navigator) =>
					<TouchableHighlight onPress={() => {
						if (route.index === 0) {
							navigator.push(routes[1]);
						} else {
							navigator.pop();
						}
						}}>
					<Text>Hello {route.title}!</Text>
					</TouchableHighlight>
				}
				style={{padding: 100}}
			/>
		);
	}
}