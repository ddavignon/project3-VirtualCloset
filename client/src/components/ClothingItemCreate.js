import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { ADD_CLOTHING_ITEM_IMAGE } from '../api/constants';
import {
    clothingItemUpdate,
    clothingItemCreate,
    clothingItemImageUpload
} from '../actions';
import { Card, CardSection, Button } from './common';
import ClothingItemForm from './ClothingItemForm';

class ClothingItemCreate extends Component {
    onButtonPress() {
        const { name, description, style, color, type, uri, data } = this.props;
        RNFetchBlob.fetch('POST', ADD_CLOTHING_ITEM_IMAGE, {
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'info', data: 'imageUpload' },
                { name: 'uri', filename: 'image.png', data }
                ])
                .then((response) => {
                    console.log(this.props.uri);
                    console.log(response.data);
                    this.props.clothingItemCreate({ name, description, style, color, type, uri: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <ClothingItemForm {...this.props} />
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Add Item
                        </Button>
                    </CardSection>     
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, description, style, color, type, uri, data } = state.clothingItemForm;

    return { name, description, style, color, type, uri, data };
};

export default connect(mapStateToProps, {
    clothingItemUpdate, clothingItemCreate, clothingItemImageUpload
})(ClothingItemCreate);
