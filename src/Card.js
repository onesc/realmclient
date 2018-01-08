import React, { PureComponent } from 'react';
import { Text, Image, Dimensions, PanResponder, Animated } from 'react-native';
import getImagePath from './imagesrcmap'
import { connect } from  'react-redux';

const { height, width } = Dimensions.get('window');

class Card extends PureComponent {
	constructor(props) {
		super(props)
    	this.state = { pan: new Animated.ValueXY(),
    		fingerPositionOnTouch: {x: 0, y: 0},
    		dragged: false, 
    		inZone: false, 
    		timeWhenPressed: 0, 
    		targeting: null 
    	};
	}

	componentWillMount = () => {
		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setValue({x: 0, y: 0});

				const yOffset = height - 165 - gestureState.y0;
							console.log("yOffset: ", yOffset)

				this.state.pan.setOffset({x: 0, y: -yOffset});
				console.log(gestureState)

				this.setState({
					timeWhenPressed: e.timeStamp, 
					fingerPositionOnTouch: {x: gestureState.x0, y: gestureState.y0},
					dragged: true
				});
			},

			onPanResponderMove: Animated.event([
				null, {dx: this.state.pan.x, dy: this.state.pan.y},
			], {
				listener: (e, gestureState) => {
					if (e.timeStamp - this.state.timeWhenPressed > 300) {
						this.props.dispatch({ type: 'INSPECT_CARD', card: null })
					} 

					const { myBoard, opponentBoard } = this.props


					if (gestureState.moveX > 32 && gestureState.moveX < 116 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: "attack", targeting: myBoard.attack});
					} else if (gestureState.moveX > 150 && gestureState.moveX < 230 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: "defend", targeting: myBoard.defend});
					} else if (gestureState.moveX > 260 && gestureState.moveX < 330 && gestureState.moveY > 220 && gestureState.moveY < 320) {
						this.setState({inZone: "support", targeting: myBoard.support});
					} else if (gestureState.moveX > 32 && gestureState.moveX < 116 && gestureState.moveY > 70 && gestureState.moveY < 170) {
						this.setState({inZone: "attack", targeting: opponentBoard.attack});
					} else if (gestureState.moveX > 150 && gestureState.moveX < 230 && gestureState.moveY > 70 && gestureState.moveY < 170) {
						this.setState({inZone: "defend", targeting: opponentBoard.defend});
					} else if (gestureState.moveX > 260 && gestureState.moveX < 330 && gestureState.moveY > 70 && gestureState.moveY < 170) {
						this.setState({inZone: "support", targeting: opponentBoard.support});
					} else {
						this.setState({inZone: false, targeting: null});
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
					if (this.props.data.type === "Creature" && this.state.inZone) {
						this.props.socket.emit('playCard', this.props.data.id, this.state.inZone)						
					} else if (this.props.data.type === "Spell" && this.state.inZone) {
						console.log("playing ", this.props.data.id, " at ", this.state.targeting)
						this.props.socket.emit('playCard', this.props.data.id, null, [this.state.targeting])						
					}
				}

				this.state.pan.setValue({x: 0, y: 0});
				this.state.pan.setOffset({x: 0, y: 	0});
				this.setState({dragged: false, inZone: false});		
			}
		})
	}

	render() {
		console.log("Rendering card! ", this.props.data.name)

		const { name, cost, imageSrc, type, text, power, toughness, targets } = this.props.data;
	    const { pan, dragged, inZone } = this.state;
	    const [translateX, translateY] = [pan.x, pan.y];

	    let cardWidth = width / this.props.amount;
		let cardHeight = 200;
	    

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

	   	let imagePath = getImagePath(name);

	   	if (dragged) {
   			if (targets === 1) { imagePath = require('./images/target.png') };

	   		return (
 	   			<Animated.View style={{
	   				height: 100,
	   				width: 100,
	   				transform: [{translateX}, {translateY}]
	   			}} {...this._panResponder.panHandlers}>
	   				<Image style={{width: cardWidth, height: cardHeight * 0.4}} source={imagePath	} />
	   			</Animated.View>
	   		)
	    }

		return (
  			<Animated.View style={[style]} {...this._panResponder.panHandlers}>
  				<Text>{name}</Text><Text>{cost}</Text>
				<Image style={{width: cardWidth, height: cardHeight * 0.4}} source={imagePath}/>
				<Text>{type}</Text><Text>{text}</Text>
				<Text>{power}</Text><Text>{toughness}</Text>
        	</Animated.View>
		)
	}
}

function mapStateToProps(state) {
	const me = state.game.players.find(p => p.id === state.socket.id);
	const opponent = state.game.players.find(p => p.id !== state.socket.id);
  	return { myBoard: me.board , opponentBoard: opponent.board, socket: state.socket, inspectedCard: state.inspectedCard };
}

export default connect(mapStateToProps)(Card)