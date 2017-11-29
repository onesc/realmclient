import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

export default class Alert extends PureComponent {
	state = {
		fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
	}

	componentDidUpdate() {
		this.state.fadeAnim.setValue(1)

		Animated.timing(                  // Animate over time
		  this.state.fadeAnim,            // The animated value to drive
		  {
			toValue: 0,                   // Animate to opacity: 0 (opaque)
			duration: 4500,              // Make it take a while
		  }
		).start(); 
	}

	render() {
		if (!this.props.message) { return null}
		return (
			<Animated.View               // Special animatable View
				style={[
					{opacity: this.state.fadeAnim}, 
					this.props.style
				]}
			>
				<Text style={{fontSize: 50, backgroundColor: "gray", color: "white", textAlign: "center"}}>{this.props.message}</Text>
			</Animated.View>
		);
	}
}
