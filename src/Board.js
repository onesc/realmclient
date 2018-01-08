import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, Image, View, Dimensions, TouchableHighlight} from 'react-native';
import Card from './Card'
import BoardSlot from './BoardSlot'
import Crown from './Crown';
import Timer from './Timer';

const { height } = Dimensions.get('window');

export default class Board extends Component {
	render() {
		const { game, me, opponent, socket } = this.props;
	
		return (
			<View style={{position: "absolute", left: 0}}>
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
			</View>
		);
  	}
}


