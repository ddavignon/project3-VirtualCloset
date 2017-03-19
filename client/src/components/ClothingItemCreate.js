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

class ClothingItemCreate extends Component {
    onButtonPress() {
        const { name, description, style, color, type_clothing, image_data } = this.props;
        
        this.props.clothingItemCreate({
            name, description, style, color, type_clothing, image_data 
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
    const { 
        name, description, style, color, type_clothing, uri, image_data
    } = state.clothingItemForm;

    return { name, description, style, color, type_clothing, uri, image_data };
};

export default connect(mapStateToProps, {
    clothingItemUpdate, clothingItemCreate
})(ClothingItemCreate);
