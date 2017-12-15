import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';
import Hand from './Hand';
import BoardSlot from './BoardSlot'
import Alert from './Alert';
import Crown from './Crown';
import Timer from './Timer';
import InspectedCard from './InspectedCard'



export default class Game extends Component {
	render() { 
		const { game, socket } = this.props;
		const nextPhase = () => { socket.emit("nextPhase") }
		const me = game.players.find(p => p.id === socket.id)
		const opponent = game.players.find(p => p.id !== me.id)

		let userAlert = null;
			userAlert = game.currentPlayer.id === me.id ? "Your " + game.phase : "Opponent's" + game.phase ;

		return (
			<View style={styles.container}>
				<Timer style={{position: 'absolute', left: 30, top: 40}}
					active={game.currentPlayer.id === opponent.id} time={opponent.timeRemaining} />

				<Crown style={{position: 'absolute', left: 130, top: 0, width: 100, height: 100}}
				  isTarget={me.target && me.target.id === opponent.id} player={opponent} socket={socket}/>

				<View style={{position: 'absolute', left: 270, top: 34}}> 
					<Image style={{width: 50, height: 50}} source={require('./images/cards.png')} />
					<Text style={{position: 'absolute', left: 22, top: 8, fontSize: 20}}> {opponent.hand.length} </Text>
				</View>

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
					<TouchableHighlight
					  onPress={nextPhase}
					  style={styles.nextPhase}>
						<Text> Next Phase </Text>
					</TouchableHighlight>
				}

				<Alert style={styles.alert} message={userAlert}/>
			
				<Hand manaAvailable={me.currentMana} cards={me.hand} socket={socket}/>

				<InspectedCard />

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
