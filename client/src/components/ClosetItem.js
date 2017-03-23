import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ClosetItem extends Component {	
  render() {
    const { img, button } = styles;

    return (
        <TouchableWithoutFeedback>
            <View style={button}>
                <Image style={img} source={{ uri: this.props.uri }} />
            </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = {
    button: {
        margin: 7,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 3,
    },
    img: {
        width: 150,
        height: 125,
    }
};

export default ClosetItem;
