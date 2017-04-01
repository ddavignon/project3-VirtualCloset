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
import ImagePicker from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import { clothingItemUpdate, clothingItemResults } from '../actions';
import { CardSection, Input, Spinner } from './common';


class ClothingItemForm extends Component {

    // componentWillMount() {
    //     // this.displayImagePicker();
    //     console.log('props', this.props);
    // }

    displayImagePicker() {
        const options = {
            title: 'Select Clothing Item',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        const { token } = this.props;

        ImagePicker.showImagePicker(options, (response) => {
            this.props.clothingItemResults({ response, token });
        });
    }

    renderForm() {
        if (this.props.loading) {
            return (
                <CardSection>
                    <Spinner size="large" />
                </CardSection>
            );
        }

        return (
            <View>
                <CardSection>
                    <Input
                        label="Description"
                        placeholder="super cool red sweater"
                        value={this.props.description}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'description', value })}
                    />
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 18, flex: 1 }}>
                        Style
                    </Text>
                    <RadioForm
                        style={{ padding: 5 }}
                        radio_props={[{ label: 'warm', value: 'warm' }, { label: 'cold', value: 'cold' }]}
                        initial={0}
                        onPress={value => this.props.clothingItemUpdate({ prop: 'style', value })}
                    />
                </CardSection>
            </View>
        );
    }

    render() {
        const { container, clothingItem, clothingItemContainer } = styles;       
       
        return (
            <View>
                <CardSection>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={container} onPress={this.displayImagePicker.bind(this)}> 
                            <View style={[clothingItem, clothingItemContainer, { marginBottom: 20 }]} >
                                { this.props.uri === null
                                    ? <Text>Select a Photo</Text> 
                                    : <Image style={styles.clothingItem} source={{ uri: this.props.uri }} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </CardSection>

                {/*<CardSection>
                    <Input
                        label="Name"
                        placeholder="sweater"
                        value={this.props.name}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'name', value })}
                    />
                </CardSection>*/}
                {this.renderForm()}

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text>Type</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={this.props.type_clothing}
                        onValueChange={value => this.props.clothingItemUpdate({ prop: 'type_clothing', value })}
                    >
                        <Picker label="shirt" value="shirt" />
                        <Picker label="pants" value="pants" />
                        <Picker label="shoes" value="shoes" />
                        <Picker label="accessories" value="accessories" />
                        <Picker label="outerwear" value="outerwear" />

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
    const {
        description, style, type_clothing, uri, image_data, loading
    } = state.clothingItemForm;

    const { token } = state.auth;

    return { description, style, type_clothing, uri, image_data, loading, token };
};

export default connect(mapStateToProps, {
    clothingItemUpdate, clothingItemResults
})(ClothingItemForm);
