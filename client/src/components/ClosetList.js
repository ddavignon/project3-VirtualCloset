import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image 
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    GET_CLOTHING_ITEMS,
    GET_ALL_CLOTHING_ITEMS
} from '../api/constants';
import Carousel from 'react-native-snap-carousel';
import ClosetItem from './ClosetItem';
import { CardSection, Card, Button } from './common';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles from '../styles/index.style';

class ClosetList extends Component {
    state = {
        showText: true,
        shirtItems: [],
        pantsItems: [],
        shoesItems: [],
        accessoriesItems: [],
        outerwearItems: [],
        allClosetItems: [],
        getAllClothes: false,
        latitudePosition: '37.4829525',
        longitudePosition: '-122.1480473',
    };

    componentWillMount() {
        this.getWeatherClothes();
    }

    getWeatherClothes() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitudePosition: JSON.stringify(position.coords.latitude),
                longitudePosition: JSON.stringify(position.coords.longitude)
            });
        },
        (error) => alert(JSON.stringify(error)), {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
        axios.get(GET_CLOTHING_ITEMS, { 
            headers: {
                'Authorization': 'JWT ' + this.props.token
            },
            params: {
                lat: this.state.latitudePosition,
                lng: this.state.longitudePosition
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({ 
                shirtItems: response.data.shirts,
                pantsItems: response.data.pants,
                shoesItems: response.data.shoes,
                accessoriesItems: response.data.accessories,
                outerwearItems: response.data.outerwear 
                });
            })
        .catch((err) => {
            console.log(err);
        });
        this.setState({ getAllClothes: false });
    }

    getAllClothes() {
        axios.get(GET_ALL_CLOTHING_ITEMS.concat(this.props.user), { 
            headers: {
                'Authorization': 'JWT ' + this.props.token
            }
        })
        .then((response) => {
            console.log(response);

            const shirts = [];
            const pants = [];
            const shoes = [];
            const accessories = [];
            const outerwear = [];

            response.data.items.map(item => {
                switch (item.type_clothing) {
                    case 'shirt':
                        shirts.push(item);
                        break;
                    case 'pants':
                        pants.push(item);
                        break;
                    case 'shoes':
                        shoes.push(item);
                        break;
                    case 'accessories':
                        accessories.push(item);
                        break;
                    case 'outerwear ':
                        outerwear.push(item);
                        break;
                    default:
                        console.log('no clothes!');
                }
                return null;
            });
            this.setState({ 
                shirtItems: shirts,
                pantsItems: pants,
                shoesItems: shoes,
                accessoriesItems: accessories,
                outerwearItems: outerwear, 
                allClosetItems: response.data.items,
            });
        })
        .catch((err) => {
            console.log(err);
        });
        this.setState({ getAllClothes: true });
    }

    getSlides(entries) {
        if (!entries) {
            return false;
        }
        return entries.map((entry, index) => {
            return (
                <ClosetItem
                  key={`carousel-entry-${index}`}
                  even={(index + 1) % 2 === 0}
                  {...entry}
                />
            );
        });
    }

    /*// no momentum scal opacity
    get example1() {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={1}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              enableMomentum={false}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            >
                { this.getSlides(ENTRIES1) }
            </Carousel>
        );
    }

    // momenteum / autoplay
    get example2(items) {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={2500}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
              >
                  { this.getSlides(items) }
              </Carousel>
        );
    }*/

    renderItems(items) {
        return (
            <Carousel
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={2500}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
              >
                  { this.getSlides(items) }
              </Carousel>
        );
    }

    render() {
        const {
            container,
            scrollview,
            title,
        } = styles;
        return (
            <View style={container}>
                <ScrollView
                  style={scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    <Text style={title}>Shirts</Text>
                    {this.renderItems(this.state.shirtItems)}
                    <Text style={title}>Pants</Text>
                    {this.renderItems(this.state.pantsItems)}
                    <Text style={title}>Shoes</Text>
                    {this.renderItems(this.state.shoesItems)}
                    <Text style={title}>Outerwear</Text>
                    {this.renderItems(this.state.outerwearItems)}
                    <Text style={title}>Accessories</Text>
                    {this.renderItems(this.state.accessoriesItems)}
                    <Text style={title}>All Items</Text>
                    {this.renderItems(this.state.allClosetItems)}
                </ScrollView>
                <CardSection>
                    <View style={avatarStyle.containerStyle}>
                        <Button onPress={this.getAllClothes.bind(this)}>
                            Get All Clothes
                        </Button>
                        <Button onPress={this.getWeatherClothes.bind(this)}>
                            Get Clothes for Weather!
                        </Button>
                        <Image
                            style={{ width: 75, height: 75 }}
                            source={{ uri: 'https://9to5mac.files.wordpress.com/2015/09/face-yellow-loop-60-emoji.gif' }}
                        />
                    </View>
                </CardSection>
            </View>
        );
    }
}

const avatarStyle = {
    containerStyle: {
        height: 75,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

const mapStateToProps = (state) => {
    const { user, token } = state.auth;
    
    return { user, token };
};

export default connect(mapStateToProps, null)(ClosetList);
