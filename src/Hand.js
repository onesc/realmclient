import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native';


class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { name, cost, imageSrc, type, text, power, toughness} = this.props.data;

		return (
			<View className="card">
				<Text className="name">{name}</Text><Text className="cost">{cost}</Text>
				<Image className="image" style={{width: "100%", height: "40%"}}  source={require('./monster-fat-horror.jpg')}/>
				<Text className="type">{type}</Text><Text className="text">{text}</Text>
				<Text className="power">1</Text><Text className="toughness">{toughness}</Text>
			</View>
		)
	}
}

export default class Hand extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
  	const cards = this.props.cards;

	const cardsList = cards.map(card => {
		return <Card style={styles.card} data={card}/>;
	})

    return cardsList;
  }
}

const styles = StyleSheet.create(
  {
    hand: {
      flex: 1,
      padding: 8,
      flexDirection: 'row', // main axis
      justifyContent: 'center', // main axis
      alignItems: 'center', // cross axis
    },
    card: {
    	width: 50,
    	height: 90
    }
  });

Hand.defaultProps = {
	cards: []
};

