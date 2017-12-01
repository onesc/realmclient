import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

export default class Crown extends PureComponent {
	static defaultProps = {
		player: null,
		isTarget: false,
		targetable: true
	}

	render() {
		const { socket, isTarget, player, targetable } = this.props;
		const borderStyle = isTarget ? {borderWidth: 2, borderColor: "red" } : {};
		const { style } = StyleSheet.create({style: {...borderStyle, ...this.props.style }});

		const onPressButton = isTarget && targetable ? () => {} : () => {
			socket.emit('setTarget', {id: player.id, type: "Player"});
		}

		return (
			<TouchableWithoutFeedback onPress={onPressButton}>
				<View style={style}> 
	  				<Image style={{position: 'absolute', width: 100, height: 100}} source={require('./images/crown.png')}/>
 					<Text style={{position: 'absolute', left: 25, top: 50, color: "red"}}>{player.hp}</Text>
					<Text style={{position: 'absolute', left: 60, top: 50, color: "blue"}}>{player.currentMana}</Text>
				</View>
			</TouchableWithoutFeedback>	
		);
  	}
}