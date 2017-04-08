import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export class MyMap extends Component {

  state = {
    modalVisible: false,
    editing: 0,
    latitude: 0,
    longitude: 0,
    pins: [],
  }

  constructor(props) {
    super(props);
    this.setState({to_home_screen: props.to_home_screen})
    navigator.geolocation.getCurrentPosition(x => {
      this.setState({latitude: x.coords.latitude, longitude: x.coords.longitude});
    })
  }
  
  render() {
    return(
    <View style ={styles.container}>
    <MapView
    style={styles.map}
    initialRegion={{
      latitude: this.state ? this.state.latitude : 0,
      longitude: this.state ? this.state.longitude : 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
    onPress={x => {
      let pins = this.state.pins
      pins.push({latlng: x.nativeEvent.coordinate, title: this.state.pins.length.toString(), description: "test", key: uuid()})
      this.setState({pins: pins})
    }}
    >
    {this.state.pins.map(x => (
      <MapView.Marker
      coordinate={x.latlng}
      title={x.title}
      description={x.description}
      onCalloutPress={() => {
        this.setState({editing: x.key, modalVisible: true})
      }}
      />
      ))}
      </MapView>
      <Modal
      animationType={"slide"}
      transparent={false}
      visible={this.state.modalVisible}>
      <View style={{marginTop: 22}}>
      <View>
      <Text>Editing {this.state.editing}</Text>
      
      <TouchableHighlight
      onPress={() => {
        this.setModalVisible(!this.state.modalVisible) }
      }>
      <Text>Done</Text>
      </TouchableHighlight>
      </View>
      </View>
      </Modal>
      </View>
      );
    }
  }