/**
 * Controls changing background image.
 */

import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View
} from 'react-native';

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {currentLocation: 'home'};
    }
    render() {
        return(
            <Image
                style={styles.backgroundImage}
                {/* BELOW IS TOTALLY A PLACEHOLDER */}
                source={require('../resources/img/beedle.png')}
            />
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        tintColor: 'F2F2F2'
    }
});

export default Background;
