import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
    clothingItemUpdate,
    clothingItemCreate
} from '../actions';
import {
    Card,
    CardSection,
    Button,
    Spinner
} from './common';
import ClothingItemForm from './ClothingItemForm';

class ClothingItemCreate extends Component {
    onButtonPress() {
        const { description, style, type_clothing, image_data, token } = this.props;

        this.props.clothingItemCreate({
            description, style, type_clothing, image_data, token
        });
    }
    _renderForm() {
      if (this.props.loading) {
        return (
        <CardSection>
            <Spinner size="large" />
        </CardSection>
      );
    }
      return (
        <Card>
            <ClothingItemForm {...this.props} />
            <CardSection>
                <Button onPress={this.onButtonPress.bind(this)}>
                    Add Item
                </Button>
            </CardSection>
        </Card>
      );
    }
    render() {
        return (
            <ScrollView>
                {this._renderForm()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        description, style, type_clothing, uri, image_data, loading
    } = state.clothingItemForm;

    const { token } = state.auth;

    return { description, style, type_clothing, uri, image_data, token, loading };
};

export default connect(mapStateToProps, {
    clothingItemUpdate, clothingItemCreate
})(ClothingItemCreate);
