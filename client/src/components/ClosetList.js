import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { GET_CLOTHING_ITEMS } from '../api/constants';
import ClosetItem from './ClosetItem';

class ClosetList extends Component {
    state = {
        showText: true,
        shirtItems: [],
        pantsItems: [],
        shoesItems: [],
        accessoriesItems: [],
        outerwearItems: [],
        latitudePosition: '37.4829525',
        longitudePosition: '-122.1480473',
    };

    componentWillMount() {
        axios.get(GET_CLOTHING_ITEMS, { 
                headers: {
                    'Authorization': 'JWT ' + this.props.token 
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
        navigator.geolocation.getCurrentPosition( (position) => {
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

        // axios.get(GET_CLOTHING_ITEMS, { 
        //     headers: {
        //         'Authorization': 'JWT ' + this.props.token 
        //     },
        //     params: {
        //         lat: this.state.latitudePosition,
        //         lng: this.state.longitudePosition,
        //         user_id: 'tester@yahoo.com'
        //     }
        // })
        // .then((response) => {
        //     console.log(response);
        //     this.setState({ 
        //         shirtItems: response.data.shirts,
        //         pantsItems: response.data.pants,
        //         shoesItems: response.data.shoes 
        //         });
        //     })
        // .catch((err) => {
        //     console.log(err);
        // });
    }

    renderItems(items) {
        return (
            <View style={{ height: 150 }}>
                <ScrollView 
                    automaticallyAdjustContentInsets={false}
                    horizontal
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                >
                    {items.map(item => 
                        <ClosetItem
                            key={item._id}
                            uri={item.url_path}
                            item={item} 
                        />
                    )}
                </ScrollView>
            </View>
        );  
    }

    render() {
        return (
            <ScrollView>
              <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>
                        "Here's what I got to work with!"
                    </Text>
                </View>
                {this.renderItems(this.state.shirtItems)}
                {this.renderItems(this.state.pantsItems)}
                {this.renderItems(this.state.shoesItems)}
                {this.renderItems(this.state.outerwearItems)}
                {this.renderItems(this.state.accessoriesItems)}
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

const mapStateToProps = (state) => {
    const { email, token } = state.auth;

    return { email, token };
};

export default connect(mapStateToProps, null)(ClosetList);
