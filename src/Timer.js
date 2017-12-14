import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class Timer extends PureComponent {
	state = {
		time: 999999
	}

	componentDidMount() {
		this.setState({time: this.props.time});
		this.interval = setInterval(this.tick, 1000) 
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active && !this.props.active) {
			this.setState({time: this.props.time});
		}
	}

	tick = () => {
		if (this.props.active) {
			this.setState({time: this.state.time - 1000});
		}
		console.log("TICKING " + this.state.time);
	}

	render() {
		const { time, active } = this.props;
		const timeColor = active ? "red" : "black"; 

		let minutes = parseInt(this.state.time / 1000 / 60);
		let seconds = parseInt(this.state.time / 1000 % 60);
		if (seconds < 10) { seconds = "0" + seconds};

		return (
			<View style={this.props.style}>
				<Text style={{color: timeColor, fontSize: 25}}>
					{minutes + ":" + seconds}
				</Text>
			</View>
		);
  	}
}