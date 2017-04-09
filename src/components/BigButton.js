/*
 * Buttons for the home screen.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

export default class BigButton extends Component {
    render() {
        return(
            <Text style={styles.button}>{this.props.children}</Text>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        color: '#B3B3B3',
        fontFamily: 'font-awesome',
        textShadowColor: '#474747',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowRadius: 1
    }
});
