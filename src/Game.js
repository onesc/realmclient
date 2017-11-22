import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Hand from './Hand';

export default class Game extends Component {
	constructor(props) {
		super(props);
	}

	render() { 
		const nextPhase = () => { this.props.socket.emit("nextPhase") }
		const { game } = this.props;
		const me = game.players.find(p => p.id === this.props.socket.id)
		const opponent = game.players.find(p => p.id !== me.id)

		return (
			<View style={styles.container}>
				<View style={{position: 'absolute', left: 130, top: 0}}> 
	  				<Image style={{position: 'absolute', width: 100, height: 100}} source={require('./images/crown.png')}/>
 					<Text style={{position: 'absolute', left: 25, top: 50, color: "red"}}>{opponent.hp}</Text>
					<Text style={{position: 'absolute', left: 60, top: 50, color: "blue"}}>{opponent.currentMana}</Text>
				</View>

				<View style={{position: 'absolute', left: 30, top: 120}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/bow.png')}/>
				</View>

				<View style={{position: 'absolute', left: 140, top: 120}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/shield.png')}/>
				</View>

				<View style={{position: 'absolute', left: 240, top: 120}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/circle.jpg')}/>
				</View>

				<View style={{position: 'absolute', left: 30, top: 250}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/bow.png')}/>
				</View>

				<View style={{position: 'absolute', left: 140, top: 250}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/shield.png')}/>
				</View>

				<View style={{position: 'absolute', left: 240, top: 250}}> 
	  				<Image style={{position: 'absolute', width: 80, height: 80}} source={require('./images/circle.jpg')}/>
				</View>

				<View style={{position: 'absolute', left: 130, top: 340}}> 
	  				<Image style={{position: 'absolute', width: 100, height: 100}} source={require('./images/crown.png')}/>
					<Text style={{position: 'absolute', left: 25, top: 50, color: "red"}} >{me.hp}</Text>
					<Text style={{position: 'absolute', left: 60, top: 50, color: "blue"}}> {me.currentMana}</Text>
				</View>

				<View style={styles.nextPhase} > 
					<Button
					  onPress={nextPhase}
					  title="Next Phase"
					  color="#841584"
					/>
				</View>
			
				<Hand cards={me.hand} socket={this.props.socket}/>
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

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
