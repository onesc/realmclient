import React, { Component } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import Card from './Card'

const { height, width } = Dimensions.get('window');

export default class Hand extends Component {
	render() {
		const { cards, socket } = this.props;

		const cardsList = cards.map(card => <Card data={card} amount={cards.length} socket={socket}/>);

		return (<View style={ style }>{cardsList}</View>);
  	}
}

const { hand: style } = StyleSheet.create({
	hand: {
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		left: 0, 
		top: height - 200, 
	}
});