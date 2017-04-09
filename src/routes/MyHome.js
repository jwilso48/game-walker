/**
 * Home screen lmao
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	View
} from 'react-native';
import {Background, BigButton} from '../components/';

export default class MyHome extends Component {
	render() {
		return(
			<Background>
				<BigButton>
					f278
				</BigButton>
				<BigButton>
					f144
				</BigButton>
			</Background>
		);
	}
}

// AppRegistry.registerComponent('MyHome', () => MyHome);