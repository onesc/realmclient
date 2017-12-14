import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Hand from './Hand';
import BoardSlot from './BoardSlot'
import Alert from './Alert';
import Crown from './Crown';
import Timer from './Timer';

export default class Game extends Component {
	render() { 
		const { game, socket } = this.props;
		const nextPhase = () => { socket.emit("nextPhase") }
		const me = game.players.find(p => p.id === socket.id)
		const opponent = game.players.find(p => p.id !== me.id)

		let userAlert = null;
		if (game.phase === "first_main") {
			userAlert = game.currentPlayer.id === me.id ? "Your Turn" : "Opponent's Turn";
		}

		return (
			<View style={styles.container}>
				<Timer style={{position: 'absolute', left: 30, top: 40}}
					active={game.currentPlayer.id === opponent.id} time={opponent.timeRemaining} />

				<Crown style={{position: 'absolute', left: 130, top: 0, width: 100, height: 100}}
				  isTarget={me.target && me.target.id === opponent.id} player={opponent} socket={socket}/>

				<BoardSlot 
				  style={{top: 120, left: 30, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/bow.png')}
				  isTarget={me.target && opponent.board.attack && me.target.id === opponent.board.attack.id} 
				  socket={socket} card={opponent.board.attack} />

				<BoardSlot 
				  style={{top: 120, left: 130, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/shield.png')}
				  isTarget={me.target && opponent.board.defend && me.target.id === opponent.board.defend.id} 
				  socket={socket} card={opponent.board.defend}/>

				<BoardSlot 
				  style={{top: 120, left: 230, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/circle.jpg')}
				  isTarget={me.target && opponent.board.support && me.target.id === opponent.board.support.id} 
				  socket={socket} card={opponent.board.support}/>

				<BoardSlot 
				  style={{top: 250, left: 30, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/bow.png')} socket={socket} 
				  card={me.board.attack}/>

				<BoardSlot 
  				  style={{top: 250, left: 130, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/shield.png')} 
				  socket={socket} card={me.board.defend}/>

				<BoardSlot   				  
				  style={{top: 250, left: 230, position: 'absolute', width: 90, height: 90}} 
				  positionImagePath={require('./images/circle.jpg')}
				  socket={socket} card={me.board.support}/>

  				<Timer style={{position: 'absolute', left: 30, top: 380}}
					active={game.currentPlayer.id === me.id} time={me.timeRemaining} />
					
				<Crown targetable={false} style={{position: 'absolute', left: 130, top: 340, width: 100, height: 100}}
				  isTarget={me.target && me.target.id === me.id} player={me} socket={socket}/>

				{game.currentPlayer.id === me.id && 
					<View style={styles.nextPhase}> 
						<Button
						  onPress={nextPhase}
						  title="Next Phase"
						  color="#841584"
						/>
					</View>
				}

				<Alert style={styles.alert} message={userAlert}/>
			
				<Hand cards={me.hand} socket={socket}/>

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
		right: 0
	},
	alert: { position: "absolute", top: 200, width: 300, height: 200 }
});
