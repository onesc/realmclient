import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableWithoutFeedback, PanResponder, Animated } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class Card extends Component {
	constructor(props) {
		super(props)
    	this.state = { pan: new Animated.ValueXY(), hovered: false };
	}

	componentWillMount = () => {
		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setValue({x: 0, y: 0});
				this.setState({hovered: true});
			},

			onPanResponderMove: Animated.event([
				null, {dx: this.state.pan.x, dy: this.state.pan.y},
			]),

			onPanResponderRelease: (e, {vx, vy}) => {
				this.state.pan.setValue({x: 0, y: 0});
				this.setState({hovered: false});
			}
		});
	}

	render() {
		const { name, cost, imageSrc, type, text, power, toughness} = this.props.data;
	    const { pan, hovered } = this.state;
	    const [translateX, translateY] = [pan.x, pan.y];

	    let cardWidth = width / this.props.amount;

	    if (hovered) { cardWidth = cardWidth * 2 }; 

	    const style = {
			backgroundColor: "white",
			height: 200,
			borderWidth: 2,
			borderColor: "black",
			width: cardWidth,
			transform: [{translateX}, {translateY}]
	    };

		return (
  			<Animated.View {...this._panResponder.panHandlers} style={[style]} className="card">
  				<Text className="name">{name}</Text><Text className="cost">{cost}</Text>
  				<Image className="image" style={{width: cardWidth, height: 70}}  source={require('./images/horror.jpg')}/>
  				<Text className="type">{type}</Text><Text className="text">Bones</Text>
  				<Text className="power">1</Text><Text className="toughness">{toughness}</Text>
        	</Animated.View>
		)
	}
}