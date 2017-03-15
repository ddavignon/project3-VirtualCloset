import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class ImageUpload extends Component {

  state = {
    clothingItemSource: null
  };

  componentWillMount() {
    this.displayImagePicker();
  }

  displayImagePicker() {
    const options = {
        title: 'Select Clothing Item',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          clothingItemSource: source
        });
      }
    });
  }

  render() {
    const { container, clothingItem, clothingItemContainer } = styles;

    return (
      <View>
        <TouchableOpacity style={container} onPress={this.displayImagePicker.bind(this)}> 
          <View style={[clothingItem, clothingItemContainer, { marginBottom: 20 }]} >
          { this.state.clothingItemSource === null ? <Text>Select a Photo</Text> :
            <Image style={clothingItem} source={this.state.clothingItemSource} />
          }
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  clothingItemContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  clothingItem: {
    borderRadius: 5,
    width: 150,
    height: 150
  }
});

export default ImageUpload;
