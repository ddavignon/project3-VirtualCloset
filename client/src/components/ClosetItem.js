
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';

class ClosetItem extends Component {

    static propTypes = {
        description: PropTypes.string.isRequired,
        style: PropTypes.string,
        url_path: PropTypes.string,
        even: PropTypes.bool
    };

    render() {
        const { description, style, url_path, even } = this.props;

        const uppercaseTitle = description ? (
            <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ description.toUpperCase() }</Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${description}'`); }}
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
                    <Text style={[styles.style, even ? styles.subtitleEven : {}]} numberOfLines={2}>{ style }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ClosetItem;
