import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import getImagePath from './imagesrcmap'

export default class BoardSlot extends PureComponent {
	static defaultProps = {
		side: "opponent",
		position: "attack",
		card: false,
		isTarget: false
	}

	render() {
		const { card, side, position, socket, isTarget } = this.props;
		let containerStyle = { position: 'absolute', width: 90, height: 90 };
		let boardImagePath;

		if (position === "Attack") { containerStyle.left = 30; boardImagePath = require('./images/bow.png')} 
		else if (position === "Defend") { containerStyle.left = 140; boardImagePath = require('./images/shield.png') } 
		else if (position === "Support") { containerStyle.left = 240; boardImagePath = require('./images/circle.jpg') } 

		if (side === "opponent") { containerStyle.top = 120 } 
		else if (side === "player") { containerStyle.top = 250 }

		if (isTarget) {
			containerStyle.borderWidth = 2;
			containerStyle.borderColor = "red";
		}

		const { style } = StyleSheet.create({style: containerStyle});

		if (!card) {
			return (
				<View style={style}> 
					<Image style={{position: 'absolute', width: 80, height: 80}} source={boardImagePath}/>
				</View>
			);
		}

		const { name, power, toughness } = card;
		const cardImagePath = getImagePath(name);

		const onPressButton = () => {
			socket.emit('setTarget', {id: card.id, type: "Creature"});
		}

		return (
			<TouchableWithoutFeedback onPress={onPressButton}>
				<View style={style}>
					<Image style={{position: 'absolute', width: 80, height: 80}} source={boardImagePath}/>
					<Image style={{position: 'absolute', width: 60, height: 60}} source={cardImagePath}/>	
					<Text>{power}</Text><Text>{toughness}</Text>
				</View>
			</TouchableWithoutFeedback>	
		);
  	}
}