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

function uuid() {
  var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default class MyMap extends Component {

  state = {
    modalVisible: false,
    editing: null,
    latitude: 0,
    longitude: 0,
    temp_description: "",
    temp_title: "",
    temp_radius: "",
    pins: [],
  }

  constructor(props) {
    super(props);
    this.setState({to_home_screen: props.to_home_screen})
    navigator.geolocation.getCurrentPosition(x => {
      this.setState({latitude: x.coords.latitude, longitude: x.coords.longitude});
    })
  }

  setModalVisible(visible) { this.setState({modalVisible: visible}); }
  
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
      pins.push({latlng: x.nativeEvent.coordinate, title: this.state.pins.length.toString(), description: "test", identifier: uuid()})
      this.setState({pins: pins})
    }}
    >
    {this.state.pins.map(x => (
      <MapView.Marker
      coordinate={x.latlng}
      title={x.title}
      description={x.description}
      key={x.identifier}
      draggable
      onCalloutPress={() => {
        this.setState({editing: x, modalVisible: true})
      }}/>
      ))}
      </MapView>
      <Modal
      animationType={"slide"}
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible(!this.state.modalVisible);
        ToastAndroid.show("Changes discarded", ToastAndroid.SHORT);
      }}>
      <View style={{marginTop: 22}}>
      <View>
      <Text>Editing {this.state.editing ? this.state.editing.identifier : "nothing"}</Text>
      <Text>Location Name</Text>
      <TextInput defaultValue={this.state.editing ? this.state.editing.title : ""}
      onChangeText={x => {
        this.state.temp_title = x
      }}/>
      <Text>Song Group</Text>
      <TextInput defaultValue={this.state.editing ? this.state.editing.description : ""}
      onChangeText={x => {
        this.state.temp_description = x
      }}/>
      <Text>Radius</Text>
      <TextInput defaultValue={this.state.editing ? this.state.editing.radius : ""}
      onChangeText={x => {
        this.state.temp_radius = x
      }}/>
      <TouchableHighlight
      onPress={() => {
        this.state.editing.title = this.state.temp_title != "" ? this.state.temp_title : this.state.editing.title;
        this.state.editing.description = this.state.temp_description != "" ? this.state.temp_description : this.state.editing.description;
        this.state.editing.radius = this.state.temp_radius
        this.state.temp_description = "";
        this.state.temp_title = "";
        this.setModalVisible(!this.state.modalVisible);
        ToastAndroid.show("Changes saved", ToastAndroid.SHORT);
      }
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