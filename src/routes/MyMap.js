import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Modal,
  View,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native';
import MapView from 'react-native-maps';

const Sound = require('react-native-sound');
var curSong = ''; //This is where the current/next song is put.
//Note, song playing won't update until change is called

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

function uuid() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x'
      ? r
      : (r & 0x3 | 0x8)).toString(16);
  });
}

export default class MyMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      editing: null,
      latitude: 0,
      longitude: 0,
      temp_description: "",
      temp_title: "",
      temp_radius: "",
      pins: []
    }
    this.setState({to_home_screen: props.to_home_screen});
    this.state.loopingSound = undefined;
    Sound.setCategory('Ambient', true);
    navigator
      .geolocation
      .getCurrentPosition(x => {
        this.setState({latitude: x.coords.latitude});
        this.setState({longitude: x.coords.longitude});
      });

    this.playSoundLooped = () => {
      if (this.state.loopingSound) {
        return;
      }
      const s = new Sound(curSong, Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        }
        s.setNumberOfLoops(-1);
        s.play();
      });
      this.setState({loopingSound: s});
    };

    this.stopSoundLooped = () => {
      if (!this.state.loopingSound) {
        return;
      }
      this
        .state
        .loopingSound
        .stop()
        .release();
      this.setState({loopingSound: null});
    };

    this.changed = () => {
      if (!this.state.loopingSound) {
        return;
      }
      this
        .state
        .loopingSound
        .stop()
        .release();
      this.setState({loopingSound: null});

      const s = new Sound(curSong, Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        }
        s.setNumberOfLoops(-1);
        s.play();
      });
      this.setState({loopingSound: s});
    };

    this.updater = () => {
      // TODO:find location, associate pins with songs in settings ideally, pins would
      // be something like a tree for efficiency, but instead for each of pins p,
      // along with matching song
      let locSong = 'music/wind-waker/1-31 Ocean.mp3';
      // Todo: no song to loc info yet currently, will apply one song to all pins, and
      // overworld song otherwise
      for (p in this.state.pins) {
        if ((Math.pow((x.coords.latitude - p.latitude), 2) + Math.pow((x.coords.longitude - p.longitude), 2)) < 10) {
          locSong = 'music/wind-waker/1-01 Title.mp3';
          break; //no need to search more
        }
      }

      //if not playing, start
      if (curSong == '') {
        curSong = locSong;
        this.playSoundLooped;
        //if different location song, change
      } else if (curSong != locSong) {
        curSong = locSong;
        this.changed;
      }
    }

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
          latitude: this.state
            ? this.state.latitude
            : 0,
          longitude: this.state
            ? this.state.longitude
            : 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
          onPress={x => {
          let pins = this
            .state
            .pins pins
            .push({
              latlng: x.nativeEvent.coordinate,
              title: this
                .state
                .pins
                .length
                .toString(),
              description: "test",
              identifier: uuid(),
              radius: 10
            })this
            .setState({pins: pins})
        }}>
          {this
            .state
            .pins
            .map(x => (<MapView.Marker
              coordinate={x.latlng}
              title={x.title}
              description={x.description}
              key={x.identifier}
              draggable
              onCalloutPress={() => {
              this.setState({editing: x, modalVisible: true})
            }}/>))}
          {this
            .state
            .pins
            .map(x => (<MapView.Circle center={x.latlng} radius={x.radius} key={x.identifier}/>))}
        </MapView>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
          ToastAndroid.show("Changes discarded", ToastAndroid.SHORT);
        }}>
          <View style={{
            marginTop: 22
          }}>
            <View>
              <Text>Editing {this.state.editing
                  ? this.state.editing.identifier
                  : "nothing"}</Text>
              <Text>Location Name</Text>
              <TextInput
                defaultValue={this.state.editing
                ? this.state.editing.title
                : ""}
                onChangeText={x => {
                this.state.temp_title = x
              }}/>
              <Text>Song Group</Text>
              <TextInput
                defaultValue={this.state.editing
                ? this.state.editing.description
                : ""}
                onChangeText={x => {
                this.state.temp_description = x
              }}/>
              <Text>Radius</Text>
              <TextInput
                defaultValue={this.state.editing
                ? this
                  .state
                  .editing
                  .radius
                  .toString()
                : ""}
                onChangeText={x => {
                this.state.temp_radius = Number(x)
              }}/>
              <TouchableHighlight
                onPress={() => {
                this.state.editing.title = this.state.temp_title != ""
                  ? this.state.temp_title
                  : this.state.editing.title;
                this.state.editing.description = this.state.temp_description != ""
                  ? this.state.temp_description
                  : this.state.editing.description;
                this.state.editing.radius = this.state.temp_radius
                this.state.temp_description = "";
                this.state.temp_title = "";
                this.setModalVisible(!this.state.modalVisible);
                ToastAndroid.show("Changes saved", ToastAndroid.SHORT);
                this.updater;
              }}>
                <Text>Done</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                this.setState({
                  pins: this
                    .state
                    .pins
                    .filter(x => x.identifier != this.state.editing.identifier)
                });
                this.setModalVisible(!this.state.modalVisible);
                ToastAndroid.show("Location deleted", ToastAndroid.SHORT);
              }}>
                <Text>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );

  }
}