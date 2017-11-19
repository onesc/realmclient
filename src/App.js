import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import Hand from './Hand';

import SocketIOClient from 'socket.io-client';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:3000');
    this.socket.emit("enterPlayer");

    this.state = {
      game: {players: [{name: "Johnny", hand: []}, {name: "Catherine"}]}  
    }

    this.socket.on('state', game => {
      this.setState({game: JSON.parse(game)});
      console.log(this.state.game)
    })
  }

  render() {
    const game = this.state.game;


    return (
      <View style={styles.container}>
          <Hand cards = {game.players[0].hand}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
