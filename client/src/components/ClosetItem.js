
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

    state = {
        selectedItem: false
    }

    componentWillMount() {
        if (this.state.selectedItem) {
            this.setState({ selectedItem: this.verifyItem.bind(this) });
        }

        console.log('willmount', this.state.selectedItem);
    }

    componentDidMount() {
        console.log('didmount', this.state.selectedItem);
    }
    
    setClothesIndexUrl(type_clothing, url_path) {
        let itemSet = true;
        switch (type_clothing) {
            case 'shirt':
                this.props.clothingItemUpdate({ prop: 'shirtUrl', value: url_path });
                break;
            case 'pants':
                this.props.clothingItemUpdate({ prop: 'pantsUrl', value: url_path });
                break;
            case 'shoes':
                this.props.clothingItemUpdate({ prop: 'shoesUrl', value: url_path });
                break;
            case 'accessories':
                this.props.clothingItemUpdate({ prop: 'accessoriesUrl', value: url_path });
                break;
            case 'outerwear':
                this.props.clothingItemUpdate({ prop: 'outerwearUrl', value: url_path });
                break;
            default:
                console.log('type clothing not found');
                itemSet = false;
        }

        console.log('Set clothing item.');
        return itemSet;
    }

    verifyItem() {
        const {
            shirtUrl,
            pantsUrl,
            shoesUrl,
            outerwearUrl,
            accessoriesUrl
        } = this.props;

        let found = false;

        switch (this.state.url_path) {
            case shirtUrl:
                found = true;
            break;
            case pantsUrl:
                found = true;
            break;
            case shoesUrl:
                found = true;
            break;
            case outerwearUrl:
                found = true;
            break;
            case accessoriesUrl:
                found = true;
            break;
            default:
                return found;
        }

        return found;
    }

    handleItemSelected(type_clothing, url_path) {
        if (!this.state.selectedItem) {
            if (this.setClothesIndexUrl(type_clothing, url_path)) {
                return this.setState({ selectedItem: !this.state.selectedItem });
            }
            return this.state;
        }
        this.setClothesIndexUrl(type_clothing, '');
        return this.setState({ selectedItem: !this.state.selectedItem });
    }

    render() {
        const { 
            description,
            _id, 
            style,
            url_path,
            type_clothing,
            even,
            index
        } = this.props;

        const { selectedItem } = this.state;
    
        const uppercaseTitle = description ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                { description.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={() => this.handleItemSelected(type_clothing, url_path)}
            >
                    <View style={[styles.imageContainer, selectedItem ? styles.imageContainerEven : {}]}>
                        <Image
                        source={{ uri: url_path }}
                        style={styles.image}
                        />
                    </View>
                    <View style={[styles.textContainer, selectedItem ? styles.textContainerEven : {}]}>
                        { uppercaseTitle }
                        <Text style={[styles.style, selectedItem ? styles.subtitleEven : {}]} numberOfLines={2}>{style}</Text>
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

    const { user, token } = state.auth;

    return {
        user,
        token,
        shirtUrl,
        pantsUrl,
        shoesUrl,
        outerwearUrl,
        accessoriesUrl
    };
};

export default connect(mapStateToProps, { clothingItemUpdate })(ClosetItem);
