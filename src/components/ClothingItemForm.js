import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { CardSection, Input } from './common';

class ClothingItemForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="sweater"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Description"
                        placeholder="super cool red sweater"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Style"
                        placeholder="warm"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Color"
                        placeholder="red"
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text>Type</Text>
                    <Picker
                        style={{ flex: 1 }}
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

export default ClothingItemForm;
