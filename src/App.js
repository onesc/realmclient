import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Hand from './Hand';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.socket = SocketIOClient('http://ec2-54-206-127-123.ap-southeast-2.compute.amazonaws.com:8080/');
		this.socket.emit("enterPlayer");

		this.state = {
			game: {players: [{name: "Johnny", hand: []}, {name: "Catherine"}]}  
		};

		this.socket.on('state', game => {
			this.setState({game: JSON.parse(game)});
			console.log(this.state.gam=e)
		});
	}

	render() { 
		const game = this.state.game;

		return (
			<View style={styles.container}>
				<Text> Hello Noobs </Text>
				<Hand cards = {game.players[0].hand}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: "100%",
	}
});

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
