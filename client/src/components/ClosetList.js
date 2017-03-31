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
        latitudePosition: '37.4829525',
        longitudePosition: '-122.1480473',
    };

    componentWillMount() {
        axios.get(GET_CLOTHING_ITEMS.concat(this.props.email), { 
                headers: {
                    'Authorization': 'JWT ' + this.props.token 
                }
            })
            .then((response) => {
                console.log(response);
                this.setState({ 
                    shirtItems: response.data.shirts,
                    pantsItems: response.data.pants,
                    shoesItems: response.data.shoes 
                    });
                })
            .catch((err) => {
                console.log(err);
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

    renderShirtItems() {
        return this.state.shirtItems.map(item => 
            <ClosetItem key={item._id} uri={item.url_path} item={item} />);
    }

    renderPantsItems() {
        return this.state.pantsItems.map(item => 
            <ClosetItem key={item._id} uri={item.url_path} item={item} />);
    }

    renderShoesItems() {
        return this.state.shoesItems.map(item => 
            <ClosetItem key={item._id} uri={item.url_path} item={item} />);
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

                <View style={{ height: 150 }}>
                  <ScrollView 
                      automaticallyAdjustContentInsets={false}
                      horizontal
                      onScroll={() => { console.log('onScroll!'); }}
                      scrollEventThrottle={200}
                  >
                      {this.renderShirtItems()}
                  </ScrollView>
                </View>

                <View style={{ height: 150 }}>
                  <ScrollView 
                      automaticallyAdjustContentInsets={false}
                      horizontal
                      onScroll={() => { console.log('onScroll!'); }}
                      scrollEventThrottle={200}
                  >
                      {this.renderPantsItems()}
                  </ScrollView>
                </View>

                <View style={{ height: 150 }}>
                  <ScrollView 
                      automaticallyAdjustContentInsets={false}
                      horizontal
                      onScroll={() => { console.log('onScroll!'); }}
                      scrollEventThrottle={200}
                  >
                      {this.renderShoesItems()}
                  </ScrollView>
                </View>
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
