import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Modal,
  View,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// const dtj = require('directory-to-json');

export default class MySettings extends Component {

    state = {
        rules: [],
    }

    constructor(props) {
        super(props);
    }

    render() {
        // let songs = JSON.parse(dtj('../resources/mus', './newfile.json', (err) => console.log(err)));
        return (
            <View
                flexDirection='column'
                justifyContent='space-between'
            >
                {this.state.rules.map((x, i) => (
                    <View>
                        <Text>Name</Text>
                        <TextInput defaultValue={x.name}
                        onChangeText={y => {
                            this.state.rules[i].name = y
                        }}/>
                        <Text>Song</Text>
                        <TextInput defaultValue={x.name}
                        onChangeText={y => {
                            this.state.rules[i].song = y
                        }}/>
                    </View>
                ))}
                <TouchableHighlight
                    onPress={() => {
                        let rules = this.state.rules;
                        rules.push({name: "Title", song: "Song"});
                        this.setState({rules: rules});
                    }
                }>
                    {/*<Text>+</Text>*/}
                    <Icon
                        name='plus-circle'
                        style={styles.button}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        let rules = this.state.rules;
                        rules.pop();
                        this.setState({rules: rules});
                    }
                }>
                    {/*<Text>-</Text>*/}
                    {/*<Icon name='fa-plus-circle' />*/}
                    <Icon
                        name='trash'
                        style={styles.button}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	button: {
		fontSize: 30,
		textAlign: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
	},
});