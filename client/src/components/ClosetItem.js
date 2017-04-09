
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
        even: PropTypes.bool,
        type_clothing: PropTypes.string
    };

    componentWillMount() {
        const { url_path, type_clothing } = this.props;
        
        this.setClothesIndexUrl(type_clothing, url_path);
    }

    setClothesIndexUrl(type_clothing, url_path) {
        
        console.log(type_clothing, url_path);

        switch (type_clothing) {
            case 'shirt':
                console.log('shirts!!!!!');
                this.props.clothingItemUpdate({ prop: 'shirtUrl', value: url_path });
                break;
            case 'pants':
                this.props.clothingItemUpdate({ prop: 'pantsUrl', value: url_path });
                break;
            case 'shoes':
                console.log('shoes!!!!!');
                this.props.clothingItemUpdate({ prop: 'shoesUrl', value: url_path });
                break;
            case 'accessories':
                this.props.clothingItemUpdate({ prop: 'accessoriesUrl', value: url_path });
                break;
            case 'outerwear ':
                this.props.clothingItemUpdate({ prop: 'outerwearUrl', value: url_path });
                break;
            default:
                console.log('type clothing not found');
        }

        return console.log('Set clothing item.');
    }

    render() {
        const { 
            description,
            _id, 
            style,
            url_path,
            even
        } = this.props;
    
        const uppercaseTitle = description ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}>{ description.toUpperCase() }
            </Text>
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

export default connect(null, { clothingItemUpdate })(ClosetItem);
