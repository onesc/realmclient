import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import getImagePath from './imagesrcmap'
import { connect } from  'react-redux';

class InspectedCard extends PureComponent {
	render() {
		const { inspectedCard } = this.props;

		if (!inspectedCard) { return null };

		const onPress = () => { this.props.dispatch({ type: 'INSPECT_CARD', card: null }) }

		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={{borderWidth: 4, borderColor: "black", backgroundColor: "beige", width: 300, height: "65%", position: "absolute", top: "10%", left: "10%", }}>
					<Text style={{fontSize: 27, marginLeft: 10,}}>{inspectedCard.name}</Text><Text style={{position: "absolute", right: 10, fontSize: 30}}>{inspectedCard.cost}</Text>
	  				<Image style={{left: "5%", width: "90%", height: 200}} source={getImagePath(inspectedCard.name)}/>
	  				<Text style={{fontSize: 23, marginLeft: 10,}}>{inspectedCard.type}</Text><Text style={{fontSize: 18, marginLeft: 10}}>{inspectedCard.text}</Text>
	  				<Text style={{position: "absolute", bottom: 0, left: 10, fontSize: 25}}>{inspectedCard.power}</Text><Text style={{position: "absolute", bottom: 0, right: 10, fontSize: 25}}>{inspectedCard.toughness}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
  	}
}

function mapStateToProps(state) {
  	return { inspectedCard: state.inspectedCard };
}

export default connect(mapStateToProps)(InspectedCard)