import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableWithoutFeedback, PanResponder, Animated } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class Card extends Component {
	constructor(props) {
		super(props)
    	this.state = { pan: new Animated.ValueXY(), hovered: false, inZone: false };
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
			], {
				listener: (e, gestureState) => {
					if (gestureState.moveX > 32 && gestureState.moveX < 116 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: true});
					} else if (gestureState.moveX > 150 && gestureState.moveX < 230 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: true});
					} else if (gestureState.moveX > 260 && gestureState.moveX < 330 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: true});
					} else {
						this.setState({inZone: false});
					}
				}
			}),

			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.moveX > 32 && gestureState.moveX < 116 && gestureState.moveY > 220 && gestureState.moveY < 320) {
					this.props.socket.emit('playCard', this.props.data.id, "attack")
				} else if (gestureState.moveX > 150 && gestureState.moveX < 230 && gestureState.moveY > 220 && gestureState.moveY < 320) {
					this.props.socket.emit('playCard', this.props.data.id, "defend")
				} else if (gestureState.moveX > 260 && gestureState.moveX < 330 && gestureState.moveY > 220 && gestureState.moveY < 320) {
					this.props.socket.emit('playCard', this.props.data.id, "support")
				} 
				
				this.state.pan.setValue({x: 0, y: 0});
				this.setState({hovered: false, inZone: false});
					
			}
		});
	}

	render() {
		const { name, cost, imageSrc, type, text, power, toughness} = this.props.data;
	    const { pan, hovered, inZone } = this.state;
	    const [translateX, translateY] = [pan.x, pan.y];

	    let cardWidth = width / this.props.amount;
	    let cardHeight = 200

	    if (hovered) { cardWidth = cardWidth * 1.5 };

	    if (inZone) { 
	    	cardWidth = 50;
	    	cardHeight = 60
	    }

	    const style = {
			backgroundColor: "white",
			height: cardHeight,
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