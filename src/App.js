import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Game from './Game';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.socket = SocketIOClient('http://ec2-54-206-127-123.ap-southeast-2.compute.amazonaws.com:8080/');
		this.socket.emit("enterPlayer");

		this.state = {
			gameStarted: false
		};

		this.socket.on('state', game => {
			this.setState({game: JSON.parse(game), gameStarted: true});
			console.log(this.state.game);
		});
	}

	render() {
		if (this.state.gameStarted) {
			return (
				<Game game={this.state.game} socket={this.socket} />
			);
		} else {
			return (
				<View style={styles.container}>
					<Text> Waiting for game to start... </Text>
				</View>
			);
		};		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: "100%",
	},
	nextPhase: {
		position: "absolute",
		bottom: 200,
		right: 0
	}
});

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
