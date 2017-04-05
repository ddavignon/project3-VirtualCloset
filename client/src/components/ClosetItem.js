import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { clothingItemUpdate } from '../actions';

class ClosetItem extends Component {	
  onTilePress() {
      this.props.clothingItemUpdate({ prop: 'uri', value: this.props.uri });
      Actions.clothingItemEdit({ item: this.props.item });
  }

  render() {
    const { img, button } = styles;

    return (
        <TouchableWithoutFeedback onPress={this.onTilePress.bind(this)}>
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
        width: 200,
        height: 200,
    }
};

export default connect(null, { clothingItemUpdate })(ClosetItem);
