import React, { Component } from 'react';
import { Text, Image, Dimensions, PanResponder, Animated } from 'react-native';
import getImagePath from './imagesrcmap'
import { connect } from  'react-redux';

const { height, width } = Dimensions.get('window');

class Card extends Component {
	constructor(props) {
		super(props)
    	this.state = { pan: new Animated.ValueXY(), hovered: false, inZone: false, timeWhenPressed: 0 };
	}

	componentWillMount = () => {
		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setValue({x: 0, y: 0});
				this.setState({timeWhenPressed: e.timeStamp});
			},

			onPanResponderMove: Animated.event([
				null, {dx: this.state.pan.x, dy: this.state.pan.y},
			], {
				listener: (e, gestureState) => {
					if (e.timeStamp - this.state.timeWhenPressed > 300) {
						this.props.dispatch({ type: 'INSPECT_CARD', card: null })
					} 

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
				if (e.timeStamp - this.state.timeWhenPressed < 300) {
					if (this.props.inspectedCard === this.props.data) {
						this.props.dispatch({ type: 'INSPECT_CARD', card: null })
					} else {
						this.props.dispatch({ type: 'INSPECT_CARD', card: this.props.data })
					}
				} else {
					if (this.props.data.targets === 1) {
						this.props.dispatch({ type: 'PROMPT_FOR_TARGET', promptedSpell: this.props.data })
					} else if (gestureState.moveX > 32 && gestureState.moveX < 116 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.props.socket.emit('playCard', this.props.data.id, "attack")
					} else if (gestureState.moveX > 150 && gestureState.moveX < 230 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.props.socket.emit('playCard', this.props.data.id, "defend")
					} else if (gestureState.moveX > 260 && gestureState.moveX < 330 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.props.socket.emit('playCard', this.props.data.id, "support")
					} 
				};

				this.state.pan.setValue({x: 0, y: 0});
				this.setState({hovered: false, inZone: false});		
			}
		})
	}

	render() {
		const { name, cost, imageSrc, type, text, power, toughness} = this.props.data;
	    const { pan, hovered, inZone } = this.state;
	    const [translateX, translateY] = [pan.x, pan.y];

	    let cardWidth = width / this.props.amount;
	    let cardHeight = 200

	    if (hovered) { 
	    	cardWidth = 100; 
	    	cardHeight = cardHeight * 1.2 
	    }

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

	    if (this.props.castable) {
	    	style.backgroundColor = "#91f3a3";
	    }

	    const imagePath = getImagePath(name);

		return (
  			<Animated.View style={[style]} className="card" {...this._panResponder.panHandlers}>
  				<Text className="name">{name}</Text><Text className="cost">{cost}</Text>
  				<Image className="image" style={{width: cardWidth, height: cardHeight * 0.4}} source={imagePath}/>
  				<Text className="type">{type}</Text><Text className="text">{text}</Text>
  				<Text className="power">{power}</Text><Text className="toughness">{toughness}</Text>
        	</Animated.View>
		)
	}
}

function mapStateToProps(state) {
  	return { inspectedCard: state.inspectedCard };
}

export default connect(mapStateToProps)(Card)