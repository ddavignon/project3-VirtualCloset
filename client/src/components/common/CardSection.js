import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle} >
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        //backgroundColor: '#B9EBEA',
        backgroundColor: 'rgba(0,0,0,0)', //transparent?
        //backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //borderColor: '#B9EBEA',
        borderColor: 'rgba(0,0,0,0)',
        //borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
