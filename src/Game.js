import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import Hand from './Hand';
import Board from './Board'
import Alert from './Alert';
import InspectedCard from './InspectedCard';
import { connect } from  'react-redux';

class Game extends Component {
	render() { 
		const { game, socket } = this.props;

		if (game.players.length < 2) {
			return ( 
				<View>
					<Text> Waiting for another player to join... </Text>
				</View> 
			)
		} 

		const nextPhase = () => { socket.emit("nextPhase") }
		const me = game.players.find(p => p.id === socket.id)
		const opponent = game.players.find(p => p.id !== me.id)

		let userAlert = game.currentPlayer.id === me.id ? "Your " + game.phase : "Opponent's" + game.phase ;
		const nextPhaseTest = game.phase === "first_main" ? "Go to Combat" : "End Turn";

		return (
			<View style={styles.container}>
				<Board me={me} opponent={opponent} game={game} socket={socket} />

				<Alert style={styles.alert} message={userAlert}/>
			
				<Hand manaAvailable={me.currentMana} cards={me.hand}/>

				<InspectedCard />

				{ game.currentPlayer.id === me.id && 
					<TouchableHighlight
					  onPress={() => { socket.emit("nextPhase") }}
					  style={styles.nextPhase}>
						<Text> {nextPhaseTest} </Text>
					</TouchableHighlight>
				}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: "100%",
		height: "100%"
	},
	nextPhase: {
		position: "absolute",
		bottom: 200,
		height: 50,
		width: 100,
		backgroundColor: "pink",
		right: 0
	},
	alert: {position: "absolute", top: 200, }
});


function mapStateToProps(state) {
  	return { game: state.game, socket: state.socket };
}

export default connect(mapStateToProps)(Game);
