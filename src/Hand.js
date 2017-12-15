import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, Image, View, Dimensions} from 'react-native';
import Card from './Card'

const { height } = Dimensions.get('window');

export default class Hand extends Component {
	render() {
		const { cards, socket, manaAvailable } = this.props;
		const cardsList = cards.map(card => <Card castable={manaAvailable	 >= card.cost} data={card} amount={cards.length} socket={socket}/>);

		return (
			<View style={{position: 'absolute', top: 0, left: 0}}>
				<View style={style}>{cardsList}</View>
			</View> 
		);
  	}
}

const { hand: style } = StyleSheet.create({
	hand: {
		flex: 1,
		flexDirection: 'row',
		top: height -200
	}
});