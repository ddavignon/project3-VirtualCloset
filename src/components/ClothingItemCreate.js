import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import ImageUpload from './ImageUpload';
import ClothingItemForm from './ClothingItemForm';

class ClothingItemCreate extends Component {
    render() {
        return (
            <Card>
                <ImageUpload />
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
