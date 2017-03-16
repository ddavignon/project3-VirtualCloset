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
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>
                        "Here's what I got to work with!"
                    </Text>
                </View>
                <ClosetRow items={SHIRTS} />
                <ClosetRow items={PANTS} />
                <ClosetRow items={SHOES} />
            </View>
        );
    }
}
let SHOES = ['https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
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
SHOES = SHOES.concat(SHOES);

let PANTS = ['https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
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
PANTS = PANTS.concat(PANTS);

let SHIRTS = ['https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
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
SHIRTS = SHIRTS.concat(SHIRTS); // double length of THUMBS
// let createThumbRow = (uri, i) => <ClosetItem key={i} uri={uri} />;

/*class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
	
  render() {
	  return (
		<View style={styles.button}>
		  <Image style={styles.img} source={{uri:this.props.uri}} />
		</View>
	  );
  }
}*/

// let THUMBS = ['https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'];
// THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS

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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
//  scrollView: {
//	backgroundColor: '#6A85B1',
//	height: 300,
//  },
//  horizontalScrollView: {
//    height: 120,
//  },
  containerPage: {
    height: 50,
	width: 50,
	backgroundColor: '#527FE4',
	paddingBottom: 5,
  },
  text: {
	fontSize: 20,
	color: '#888888',
	left: 80,
	top: 20,
	height: 40,
  },
  buttonContents: {
	flexDirection: 'row',
	width: 64,
	height: 64,
  }
});

export default ClosetList;


/*import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View
} from 'react-native';

class ClosetList extends Component {
    state = { showText: true };


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>
                        "Here's what I got to work with!"
                    </Text>
                </View>
			<View style={{ height: 150 }}>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    horizontal
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={[styles.scrollView, styles.horizontalScrollView]}
                >
                    {SHIRTS.map(createThumbRow)}
                </ScrollView>
			</View>
			<View style={{ height: 150 }}>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    horizontal
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={[styles.scrollView, styles.horizontalScrollView]}
                >
					{PANTS.map(createThumbRow)}
				</ScrollView>
			</View>
			<View style={{ height: 150 }}>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    horizontal
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={[styles.scrollView, styles.horizontalScrollView]}
                >
					{SHOES.map(createThumbRow)}
				</ScrollView>
			</View>
            </View>
        );
    }
}
let SHOES = ['https://s-media-cache-ak0.pinimg.com/736x/e6/16/8a/e6168a701173b7537f779d7e79ea4d8a.jpg',
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
SHOES = SHOES.concat(SHOES);

let PANTS = ['https://content.backcountry.com/images/items/medium/COL/COL3692/STE.jpg',
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
PANTS = PANTS.concat(PANTS);

let SHIRTS = ['https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwc5907d0b/images/2017/1V0586.459.a.zoom.jpg', 
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
SHIRTS = SHIRTS.concat(SHIRTS); // double length of THUMBS
let createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
	
  render() {
	  return (
		<View style={styles.button}>
		  <Image style={styles.img} source={{uri:this.props.uri}} />
		</View>
	  );
  }
}

// let THUMBS = ['https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'];
// THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS

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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
//  scrollView: {
//	backgroundColor: '#6A85B1',
//	height: 300,
//  },
//  horizontalScrollView: {
//    height: 120,
//  },
  containerPage: {
    height: 50,
	width: 50,
	backgroundColor: '#527FE4',
	paddingBottom: 5,
  },
  text: {
	fontSize: 20,
	color: '#888888',
	left: 80,
	top: 20,
	height: 40,
  },
  button: {
	margin: 7,
	padding: 5,
	alignItems: 'center',
	backgroundColor: '#eaeaea',
	borderRadius: 3,
  },
  buttonContents: {
	flexDirection: 'row',
	width: 64,
	height: 64,
  },
  img: {
	width: 150,
	height: 125,
  }
});

export default ClosetList;*/
