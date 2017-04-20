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
        color: '#FFFFFF',
        //color: '#007aff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#282828',
        //backgroundColor: '#fff',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#FCFCFC',
        shadowColor: '#E3E3E3',
        shadowOffset: { width: 5, height: 30 },
        shadowOpacity: 0.02,
        shadowRadius: 100,
        elevation: 5,
        //borderColor: '#ddd'FCFCFC,
        //borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    }
};

export { Button };
