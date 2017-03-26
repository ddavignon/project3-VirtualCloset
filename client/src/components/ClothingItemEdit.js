import _ from 'lodash';
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
    Button
} from './common';
import ClothingItemForm from './ClothingItemForm';

class ClothingItemEdit extends Component {
    componentWillMount() {
        _.each(this.props.item, (value, prop) => {
            this.props.clothingItemUpdate({ prop, value });
        });
    }

    onButtonPress() {
        console.log('cool button');
    }

    render() {
        console.log('edit', this.props);
        return (
            <ScrollView>
                <Card>
                    <ClothingItemForm {...this.props} />
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Update Item
                        </Button>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Delete Item
                        </Button>
                    </CardSection>  
                </Card> 
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        name, description, style, color, type_clothing, uri, image_data
    } = state.clothingItemForm;

    return { name, description, style, color, type_clothing, uri, image_data };
};

export default connect(mapStateToProps, {
    clothingItemUpdate, clothingItemCreate
})(ClothingItemEdit);
