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
				<Image className="image"  style={{width: 50, height: 50}}  source={require('./monster-fat-horror.jpg')}/>
				<Text className="type">{type}</Text><Text className="text">{text}</Text>
				<Text className="power">1</Text><Text className="toughness">{toughness}</Text>
				<Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
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

    return (
      <View style={styles.container}>
        <FlatList
		  data={cards}
		  renderItem={({item}) => <Card data={item}/>}
		/>
      </View>
    );
  }
}

Hand.defaultProps = {
	cards: [{
    cost:2,
    id:120,
    imageSrc:"http://jdillustration.jimmsdesign.co.uk/images/full-scale-image/monster-fat-horror.jpg",
    name:"Obese Horror",
    power: 1,
    text: "",
    toughness: 7,
    type: "Creature"
  }, {
    cost:2,
    id:120,
    imageSrc:"http://jdillustration.jimmsdesign.co.uk/images/full-scale-image/monster-fat-horror.jpg",
    name:"Obese Horror",
    power: 1,
    text: "",
    toughness: 7,
    type: "Creature",
  }, {
    cost:2,
    id:120,
    imageSrc:"http://jdillustration.jimmsdesign.co.uk/images/full-scale-image/monster-fat-horror.jpg",
    name:"Obese Horror",
    power: 1,
    text: "",
    toughness: 7,
    type: "Creature",
  }]
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
