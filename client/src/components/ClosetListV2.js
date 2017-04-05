import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StatusBar 
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    GET_CLOTHING_ITEMS,
    GET_ALL_CLOTHING_ITEMS
} from '../api/constants';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import ClosetItemV2 from './ClosetItemV2';
import styles from '../styles/index.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';

class ClosetListV2 extends Component {
    state = {
        showText: true,
        shirtItems: [],
        pantsItems: [],
        shoesItems: [],
        accessoriesItems: [],
        outerwearItems: [],
        allClosetItems: [],
        latitudePosition: '37.4829525',
        longitudePosition: '-122.1480473',
    };

    componentWillMount() {
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

        axios.get(GET_ALL_CLOTHING_ITEMS.concat(this.props.user), { 
            headers: {
                'Authorization': 'JWT ' + this.props.token
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({ 
                allClosetItems: response.data.items, 
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getSlides(entries) {
        if (!entries) {
            return false;
        }
        return entries.map((entry, index) => {
            return (
                <ClosetItemV2
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
    }

    render() {
        const {
            container,
            colorsContainer,
            color1,
            color2,
            scrollview,
            title,
            subtitle,
        } = styles;
        return (
            <View style={container}>
                <StatusBar
                  translucent={true}
                  backgroundColor={'rgba(0, 0, 0, 0.3)'}
                  barStyle={'light-content'}
                />
                <View style={colorsContainer}>
                    <View style={color1} />
                    <View style={color2} />
                </View>
                <ScrollView
                  style={scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    {/*<Text style={title}>Example 1</Text>
                    <Text style={subtitle}>No momentum | Scale | Opacity</Text>
                    { this.example1 }
                    <Text style={title}>Example 2</Text>
                    <Text style={subtitle}>Momentum | Autoplay</Text>
                    { this.example2 }*/}

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
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, token } = state.auth;
    
    return { user, token };
};

export default connect(mapStateToProps, null)(ClosetListV2);
