import React, { Component } from 'react';
import {
    Alert,
    View,
    ScrollView,
    Text,
    Image,
    Platform,
    PermissionsAndroid,
    TouchableHighlight,
    Linking
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { STTandroid, STTios } from 'react-native-speech-to-text';
import Tts from 'react-native-tts';

import axios from 'axios';
import {
    GET_CLOTHING_ITEMS,
    GET_ALL_CLOTHING_ITEMS,
    GET_RECOMMENDED_ITEMS,
    SEND_CLOTHING_ITEM_IMAGE_TEXT,
    AVATAR,
    RECOMMENDATIONS
} from '../api/constants';
import ClosetItem from './ClosetItem';
import { CardSection, Spinner, Button } from './common';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles from '../styles/index.style';


const Permissions = require('react-native-permissions');

Tts.setDefaultLanguage('en-AU');

class ClosetList extends Component {
    state = {
        showItems: true,
        shirtItems: [],
        pantsItems: [],
        shoesItems: [],
        accessoriesItems: [],
        outerwearItems: [],
        allClosetItems: [],
        getAllClothes: true,
        latitudePosition: '37.4829525',
        longitudePosition: '-122.1480473',
        speechToText: '',
        voiceError: '',
        weatherTemp: '',
        locationPermission: 'undetermined',
        mixins: [TimerMixin],
        doneTalking: true,
    };

    componentWillMount() {
        // if (this.state.getAllClothes) {
        //     this.getAllClothes();
        // } else {
        //     this.getWeatherClothes();
        // }
    }

    getLocationCoords() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitudePosition: JSON.stringify(position.coords.latitude),
                longitudePosition: JSON.stringify(position.coords.longitude)
            });
        },
            (error) => {
            console.log(error);
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000 }
        );
    }

    getPermissionAndroid() {
        Permissions.getPermissionStatus('location', 'whenInUse')
          .then(response => {
            //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ locationPermission: response });
        });
    }

    getWeatherClothes() {
        this.setState({ showItems: false });

        this.getLocationCoords();

        console.log(this.state.latitudePosition, this.state.longitudePosition);
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
                outerwearItems: response.data.outerwear,
                weatherTemp: response.data.weather,
                showItems: true
            });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ showItems: true });
        });
        this.setState({ getAllClothes: false, allClosetItems: [] });
    }

    getAllClothes() {
        this.setState({ showItems: false });

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
                    case 'outerwear':
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
                showItems: true
            });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ showItems: true });
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
                  index={index}
                  {...entry}
                />
            );
        });
    }

    handleAvatarPress() {
      console.log('Pressed!');
      if (Platform.OS === 'android') {
        STTandroid.showGoogleInputDialog()
          .then((result) => {

            // console.log(result);
            // Tts.speak(result);

            this.setState({
              speechToText: result
            });

            if (this.state.speechToText === 'recommend') {
                this.setState({
                  showItems: false,
                });

                this.getLocationCoords();

                console.log(this.state.latitudePosition, this.state.longitudePosition);
                axios.get(GET_RECOMMENDED_ITEMS, {
                    headers: {
                        'Authorization': 'JWT ' + this.props.token
                    },
                    params: {
                        command: this.state.speechToText,
                        lat: this.state.latitudePosition,
                        lng: this.state.longitudePosition
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        speechToText: response.data.text,
                        shirtItems: response.data.shirts,
                        pantsItems: response.data.pants,
                        shoesItems: response.data.shoes,
                        accessoriesItems: response.data.accessories,
                        outerwearItems: response.data.outerwear,
                        weatherTemp: response.data.weather,
                        showItems: true
                    });
                    Tts.speak(this.state.speechToText);
                    this.setState({ doneTalking: false });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ showItems: true });
                });
                this.setState({ getAllClothes: false, allClosetItems: [] });
            }

            if (this.state.speechToText === 'get all clothes') {
              this.getAllClothes();
              this.setState({ doneTalking: false });
              this.setState({ speechToText: 'Here are all of your clothes!' });
              Tts.speak(this.state.speechToText);
            }

            if (this.state.speechToText === 'send text') {
              this.sendTextOfClothes();
            }

            if (this.state.speechToText === 'get recommendations') {
                if (this.state.allClosetItems.length > 0) {
                    const itemRecommendation = this.state.allClosetItems[this.getRandomItem(0, this.state.allClosetItems.length)];
                    Linking.openURL(RECOMMENDATIONS.concat(`?descripition=${itemRecommendation.description}`));
                } else {
                    Linking.openURL(RECOMMENDATIONS);
                }
            }
          })
          .catch((error) => {
            this.setState({
              voiceError: error
            });
            console.log(error);
          });
        }
    }

    componentDidMount() {
        if (this.state.doneTalking === false) {
            this.setTimeout(
              () => { console.log('setting avatar timer!'); },
              1000
            );
            this.setState({ doneTalkin: true });
        }
    }

    getRandomItem(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    sendTextOfClothes() {
        const {
            user,
            token,
            shirtUrl,
            pantsUrl,
            shoesUrl,
            outerwearUrl,
            accessoriesUrl
        } = this.props;

        const urls = [];

        if (shirtUrl) {
            urls.push(shirtUrl);
        }
        if (pantsUrl) {
            urls.push(pantsUrl);
        }
        if (shoesUrl) {
            urls.push(shoesUrl);
        }
        if (outerwearUrl) {
            urls.push(outerwearUrl);
        }
        if (accessoriesUrl) {
            urls.push(accessoriesUrl);
        }

        console.log('urls', urls);
        if (urls.length > 0) {
            console.log('urls', urls.length);
            fetch(SEND_CLOTHING_ITEM_IMAGE_TEXT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + token
                },
                body: JSON.stringify({
                    urls
                })
            })
            .then(response => {
                this.setState({ doneTalking: false });
                console.log(response);
                this.setState({
                    speechToText: 'clothes sent',
                    shirtUrl,
                    pantsUrl,
                    shoesUrl,
                    outerwearUrl,
                    accessoriesUrl
                });
                Tts.speak(this.state.speechToText);
            })
            .catch(err => {
                this.setState({ doneTalking: false });
                console.log('error', err);
                this.setState({ speechToText: 'something went wrong' });
                Tts.speak(this.state.speechToText);
            });

            return console.log({
                user,
                token,
                shirtUrl,
                pantsUrl,
                shoesUrl,
                outerwearUrl,
                accessoriesUrl
            });
        }
        Tts.speak('No items selected');
        return console.log('No items selected');
    }

    async requestLocationPermission() {
        try {
             const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Cool Fashion App needs location Permission',
                'message': 'Cool Fashion App needs access to your location so you can acces the weather.'
                }
             )
             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                 this.getLocationCoords();
             } else {
                 console.log('Location permission denied');
             }
        } catch (err) {
             console.warn(err);
        }
     }


    renderItems(items) {
        if (!this.state.showItems) {
            return (
                <CardSection>
                    <Spinner size="large" />
                </CardSection>
            );
        }
        return (
            <Carousel
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={1}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={false}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContainer}
                showsHorizontalScrollIndicator={false}
                snapOnAndroid
                removeClippedSubviews={false}
                onSnapToItem={value => console.log(value)}
            >
                { this.getSlides(items) }
            </Carousel>
        );
    }

    renderButtons() {
        return (
            <View style={{ height: 60, flex: 1 }}>
                <Button onPress={() => Actions.clothingItemCreate()}>
                    Add an item
                </Button>
            </View>
        );
    }

    //mixins: [TimerMixin],


    render() {
        const {
            container,
            scrollview,
            title,
        } = styles;

        if (Platform.OS === 'android' && this.state.locationPermission !== 'authorized') {
            this.requestLocationPermission();
        }

        return (
            <View style={container}>
                <ScrollView
                  style={scrollview}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                >
                    <Text>
                      {this.state.speechToText}
                      {this.state.voiceError}
                    </Text>
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
                        <TouchableHighlight
                          onPress={() => this.handleAvatarPress()}
                        >
                        <View style={avatarStyle.imageStyle}>
                          <Image
                              onPress={() => this.handleAvatarPress()}
                              source={{ uri: AVATAR }}
                              style={avatarStyle.imageStyle}
                          />
                          </View>
                        </TouchableHighlight>
                        {this.renderButtons()}
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
        alignItems: 'center',
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 30,
        overflow: 'hidden'
    },
};

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

export default connect(mapStateToProps, null)(ClosetList);
