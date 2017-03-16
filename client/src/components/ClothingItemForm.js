import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { clothingItemUpdate } from '../actions';
import { CardSection, Input } from './common';

class ClothingItemForm extends Component {
    render() {
        return (
            <View>
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
                {/*<CardSection>
                    <Input
                        label="Type"
                        placeholder="shirt"
                        value={this.props.type}
                        onChangeText={value => this.props.clothingItemUpdate({ prop: 'type', value })}
                    />*/}
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

const mapStateToProps = (state) => {
    const { name, description, style, color, type } = state.clothingItemForm;

    return { name, description, style, color, type };
};

export default connect(mapStateToProps, { clothingItemUpdate })(ClothingItemForm);
