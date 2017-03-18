import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image, 
    PixelRatio,
    TouchableOpacity,
    Picker
} from 'react-native';
import { connect } from 'react-redux';
// import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { clothingItemUpdate } from '../actions';
import { CardSection, Input } from './common';
import { UPLOAD_ITEM_IMAGE } from '../api/constants';


class ClothingItemForm extends Component {

    state = {
        clothingItemSource: null
    };

//   componentWillMount() {
//     this.displayImagePicker();
//   }

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

        
        // const testImageName = `image-from-react-native-${Platform.OS}-${new Date()}.jpg`;

        // const path = response.path;  
        // path ->  /storage/emulated/0/Pictures/image-8de3ead3-4411cc.jpg

        RNFetchBlob.fetch('POST', UPLOAD_ITEM_IMAGE, {
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'info', data: 'imageUpload' },
            { name: 'uri', filename: 'image.png', data: response.data }
            ])
            .then((res) => console.log(res.data));
        /*
        
        Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })      
            .then((blob) => firebase.storage()
                    .ref('images')
                    .child(testImageName)
                    .put(blob, { contentType: 'image/png' })
            )
            .then((snapshot) => { console.log(snapshot); });
            */
        
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
                <CardSection>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={container} onPress={this.displayImagePicker.bind(this)}> 
                            <View style={[clothingItem, clothingItemContainer, { marginBottom: 20 }]} >
                            { this.state.clothingItemSource === null ? <Text>Select a Photo</Text> :
                                <Image style={clothingItem} source={this.state.clothingItemSource} />
                            }
                            </View>
                        </TouchableOpacity>
                    </View>
                </CardSection>

                <CardSection>
                    <Input
                        label="Name"
                        placeholder="sweater"
                        value={this.props.name}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Description"
                        placeholder="super cool red sweater"
                        value={this.props.description}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'description', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Style"
                        placeholder="warm"
                        value={this.props.style}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'style', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Color"
                        placeholder="red"
                        value={this.props.color}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'color', value })}
                    />
                </CardSection>
  
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text>Type</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.type}
                        onValueChange={value => this.props.clothingItemUpdate({ prop: 'type', value })}
                    >
                        <Picker label="shirt" value="shirt" />
                        <Picker label="pants" value="pants" />
                        <Picker label="shoes" value="shoes" />
                        <Picker label="accessories" value="accessories" />

                    </Picker>
                </CardSection>
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

const mapStateToProps = (state) => {
    const { name, description, style, color, type } = state.clothingItemForm;

    return { name, description, style, color, type };
};

export default connect(mapStateToProps, { clothingItemUpdate })(ClothingItemForm);
