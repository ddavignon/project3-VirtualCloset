import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import ClosetRow from './ClosetRow';

class ClosetList extends Component {
    state = { showText: true };
    render() {
        return (
            <ScrollView>
              <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>
                        "Here's what I got to work with!"
                    </Text>
                </View>
                <ClosetRow items={SHIRTS} />
                <ClosetRow items={PANTS} />
                <ClosetRow items={SHOES} />
                <ClosetRow items={SHIRTS} />
                <ClosetRow items={PANTS} />
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
