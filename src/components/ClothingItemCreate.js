import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import ClothingItemForm from './ClothingItemForm';

class ClothingItemCreate extends Component {
    render() {
        return (
            <Card>
                <ClothingItemForm />
                <CardSection>
                    <Button>
                        Add Item
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default ClothingItemCreate;
