
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { clothingItemUpdate } from '../actions';
import styles from '../styles/SliderEntry.style';

class ClosetItem extends Component {

    static propTypes = {
        description: PropTypes.string.isRequired,
        _id: PropTypes.number,
        style: PropTypes.string,
        url_path: PropTypes.string,
        even: PropTypes.bool
    };

    render() {
        console.log(this.props);
        const { 
            description,
            _id, 
            style,
            url_path,
            even,
            shirtUrl,
            pantsUrl,
            shoesUrl,
            outerwearUrl,
            accessoriesUrl

        } = this.props;
        
        switch (style) {
            case 'shirt':
                this.props.clothingItemUpdate({ prop: shirtUrl, url_path });
                break;
            case 'pants':
                this.props.clothingItemUpdate({ prop: pantsUrl, url_path });
                break;
            case 'shoes':
                this.props.clothingItemUpdate({ prop: shoesUrl, url_path });
                break;
            case 'accessories':
                this.props.clothingItemUpdate({ prop: outerwearUrl, url_path });
                break;
            case 'outerwear ':
                this.props.clothingItemUpdate({ prop: accessoriesUrl, url_path });
                break;
            default:
                console.log('no clothes!');
        }

        const uppercaseTitle = description ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ description.toUpperCase() }</Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${_id}'`); }}
              >
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    <Image
                      source={{ uri: url_path }}
                      style={styles.image}
                    />
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text style={[styles.style, even ? styles.subtitleEven : {}]} numberOfLines={2}>{_id}: {style}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const mapStateToProps = (state) => {
    const {
        shirtUrl,
        pantsUrl,
        shoesUrl,
        outerwearUrl,
        accessoriesUrl
    } = state.clothingItemForm;

    return {
        shirtUrl,
        pantsUrl,
        shoesUrl,
        outerwearUrl,
        accessoriesUrl
    };
};

export default connect(mapStateToProps, { clothingItemUpdate })(ClosetItem);
