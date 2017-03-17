import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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

       
      const testImageName = `image-from-react-native-${Platform.OS}-${new Date()}.jpg`;

      const path = response.path;  
      // path ->  /storage/emulated/0/Pictures/image-8de3ead3-4411cc.jpg

      Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
        .then((blob) => firebase.storage()
                .ref('images')
                .child(testImageName)
                .put(blob, { contentType: 'image/png' })
        )
        .then((snapshot) => { console.log(snapshot); /* there we go ! */ });

    
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
          <View style={[clothingItem, clothingItemContainer, { margin: 20 }]} >
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
