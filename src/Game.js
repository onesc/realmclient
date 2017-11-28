import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Hand from './Hand';
import BoardSlot from './BoardSlot'
import Alert from './Alert';

export default class Game extends Component {
	constructor(props) {
		super(props);
	}

	render() { 
		const { game, socket } = this.props;
		const nextPhase = () => { socket.emit("nextPhase") }
		const me = game.players.find(p => p.id === socket.id)
		const opponent = game.players.find(p => p.id !== me.id)

		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', left: 130, top: 0}}> 
	  				<Image style={{position: 'absolute', width: 100, height: 100}} source={require('./images/crown.png')}/>
 					<Text style={{position: 'absolute', left: 25, top: 50, color: "red"}}>{opponent.hp}</Text>
					<Text style={{position: 'absolute', left: 60, top: 50, color: "blue"}}>{opponent.currentMana}</Text>
				</View>

				<BoardSlot isTarget={me.target && opponent.board.attack && me.target.id === opponent.board.attack.id} socket={socket} position="Attack" side="opponent" card={opponent.board.attack}/>

				<BoardSlot isTarget={me.target && opponent.board.defend && me.target.id === opponent.board.defend.id} socket={socket} position="Defend" side="opponent" card={opponent.board.defend}/>

				<BoardSlot isTarget={me.target && opponent.board.support && me.target.id === opponent.board.support.id} socket={socket} position="Support" side="opponent" card={opponent.board.support}/>

				<BoardSlot socket={socket} position="Attack" side="player" card={me.board.attack}/>

				<BoardSlot socket={socket} position="Defend" side="player" card={me.board.defend}/>

				<BoardSlot socket={socket} position="Support" side="player" card={me.board.support}/>

				<View style={{position: 'absolute', left: 130, top: 340}}> 
	  				<Image style={{position: 'absolute', width: 100, height: 100}} source={require('./images/crown.png')}/>
					<Text style={{position: 'absolute', left: 25, top: 50, color: "red"}} >{me.hp}</Text>
					<Text style={{position: 'absolute', left: 60, top: 50, color: "blue"}}> {me.currentMana}</Text>
				</View>

				{game.currentPlayer.id === me.id && 
					<View style={styles.nextPhase}> 
						<Button
						  onPress={nextPhase}
						  title="Next Phase"
						  color="#841584"
						/>
					</View>
				}
			
				<Hand cards={me.hand} socket={socket}/>

				<Alert message={opponent.hp}/>
			</View>
		);
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
