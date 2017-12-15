import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, Image, View, Dimensions} from 'react-native';
import Card from './Card'
import InspectedCard from './InspectedCard'

const { height, width } = Dimensions.get('window');

export default class Hand extends Component {
	state = {
		inspectedCard: null
	}

	render() {
		const { cards, socket, manaAvailable } = this.props;

		const onPress = selectedCard => {
			if (selectedCard === this.state.inspectedCard) {
				this.setState({inspectedCard: null}) 
			} else {
				this.setState({inspectedCard: selectedCard})
			}
		}

		const cardsList = cards.map(card => <Card onPress={onPress} castable={manaAvailable	 >= card.cost} data={card} amount={cards.length} socket={socket}/>);

		const cardHighlight = this.state.inspectedCard ? 
			<InspectedCard onPress={() => {this.setState({inspectedCard: null})}} 
			inspectedCard={this.state.inspectedCard}/>
		 : null;

		return (
			<View style={{position: 'absolute', top: 0, left: 0}}>
				{ cardHighlight }
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