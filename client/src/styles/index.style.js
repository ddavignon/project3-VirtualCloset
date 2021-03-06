import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    red: 'red',
    background1: 'rgb(224, 224, 224)',
    backround2: 'rgb(224, 224, 224)',
    backgroundLightGrey: '#EDEDED',
    // background1: 'hsl(15, 55%, 50%)',
    // background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundLightGrey
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    color1: {
        flex: 1,
        backgroundColor: colors.background1
    },
    color2: {
        flex: 1,
        backgroundColor: colors.background2
    },
    scrollview: {
        flex: 1,
        paddingTop: 15
    },
    title: {
        marginTop: 15,
        backgroundColor: 'transparent',
        //color: 'rgba(0, 0, 0, 0.9)',
        //color: '#FFFFFF',
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'rgba(0, 0, 0, 0.75)',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginBottom: 10
    },
    sliderContainer: {
        elevation: 3
    }
});
