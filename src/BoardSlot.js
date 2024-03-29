import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import getImagePath from './imagesrcmap'
import { connect } from  'react-redux';

class BoardSlot extends PureComponent {
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

		let onPress = isTarget ? () => {} : () => {
			socket.emit('setTarget', {id: card.id, type: "Creature"});
		}

		let onLongPress = () => {
			if (this.props.card !== null) { 
				this.props.dispatch({ type: 'INSPECT_CARD', card: this.props.card }) 
			}
		}

		return (
			<TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
				<View style={style}>
					<Image style={{position: 'absolute', width: 80, height: 80}} source={positionImagePath}/>
					<Image style={{position: 'absolute', width: 60, height: 60, left: 13, top: 8}} source={cardImagePath}/>	
					<Text style={{position: 'absolute', left: 20, bottom: 0}}>{power}</Text><Text style={{position: 'absolute', bottom: 0, right: 30}}>{toughness}</Text>
				</View>
			</TouchableWithoutFeedback>	
		);
  	}
}

function mapStateToProps(state) {
  	return { socket: state.socket };
}

export default connect(mapStateToProps)(BoardSlot)
