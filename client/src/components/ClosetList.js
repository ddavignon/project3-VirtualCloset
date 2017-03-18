import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import axios from 'axios';
import { GET_CLOTHING_ITEMS } from '../api/constants';
import ClosetItem from './ClosetItem';

class ClosetList extends Component {
    state = { showText: true, closetItems: [] };

    componentWillMount() {
      axios.get(GET_CLOTHING_ITEMS)
        .then((response) => {
          console.log('state', this.state.closetItems);
          this.setState({ closetItems: response.data });
          console.log('state-after', this.state.closetItems);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    renderItems() {
        return this.state.closetItems.map(item => <ClosetItem key={item._id} uri={item.urlPath} />);
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
                      {this.renderItems()}
                  </ScrollView>
                </View>

                <View style={{ height: 150 }}>
                  <ScrollView 
                      automaticallyAdjustContentInsets={false}
                      horizontal
                      onScroll={() => { console.log('onScroll!'); }}
                      scrollEventThrottle={200}
                  >
                      {this.renderItems()}
                  </ScrollView>
                </View>

                <View style={{ height: 150 }}>
                  <ScrollView 
                      automaticallyAdjustContentInsets={false}
                      horizontal
                      onScroll={() => { console.log('onScroll!'); }}
                      scrollEventThrottle={200}
                  >
                      {this.renderItems()}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
        );
    }
}

const SHOES = ['https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
'https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg'];

const PANTS = ['https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
'https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg'];

const SHIRTS = ['https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg',
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg',
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg',
'https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg'];



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

export default ClosetList;
