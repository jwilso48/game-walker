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

export default class MySettings extends Component {

    state = {
        rules: [],
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
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
                rules.push({name: "Noname", song: "Nosong"});
                this.setState({rules: rules});
            }}>
            <Text>+</Text>
            </TouchableHighlight>
            <TouchableHighlight
            onPress={() => {
                let rules = this.state.rules;
                rules.pop();
                this.setState({rules: rules});
            }}>
            <Text>-</Text>
            </TouchableHighlight>
            </View>
        );
    }

}