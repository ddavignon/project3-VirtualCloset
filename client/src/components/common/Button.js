import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#555657',
        //color: '#007aff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ddd',
        //backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FCFCFC',
        //borderColor: '#ddd'FCFCFC,
        //borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button };
