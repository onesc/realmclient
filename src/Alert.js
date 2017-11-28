import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

export default class Hand extends PureComponent {
	static defaultProps = {
		message: "Ay whats doin"
	}

	state = {
		fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
	}

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.state.fadeAnim.setValue(1)

		Animated.timing(                  // Animate over time
	      this.state.fadeAnim,            // The animated value to drive
	      {
	        toValue: 0,                   // Animate to opacity: 0 (opaque)
	        duration: 10000,              // Make it take a while
	      }
	    ).start(); 
	}

	render() {
		return (
			<Animated.View               // Special animatable View
		        style={{
		          width: 100, height: 100,
		          opacity: this.state.fadeAnim,         // Bind opacity to animated value
		        }}
	      	>
		        <Text>{this.props.message}</Text>
	      	</Animated.View>
		);
  	}
}
