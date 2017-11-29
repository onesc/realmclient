import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import getImagePath from './imagesrcmap'

export default class BoardSlot extends PureComponent {
	static defaultProps = {
		card: null,
		isTarget: false,
		positionImagePath: require('./images/shield.png')
	}

	render() {
		const { card, socket, isTarget, positionImagePath } = this.props;
		const borderStyle = isTarget ? {borderWidth: 2, borderColor: "red" } : {};

		const { style } = StyleSheet.create({style: {...borderStyle, ...this.props.style}});

		if (!card) {
			return (
				<View style={style}> 
					<Image style={{position: 'absolute', width: 80, height: 80}} source={positionImagePath}/>
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
					<Image style={{position: 'absolute', width: 80, height: 80}} source={positionImagePath}/>
					<Image style={{position: 'absolute', width: 60, height: 60}} source={cardImagePath}/>	
					<Text>{power}</Text><Text>{toughness}</Text>
				</View>
			</TouchableWithoutFeedback>	
		);
  	}
}