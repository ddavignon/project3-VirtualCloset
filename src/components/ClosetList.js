import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

class ClosetList extends Component {
    state = { showText: true, initialPosition: '' };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            var initialPosition = JSON.stringify(position);
            this.setState({initialPosition});
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    render() {
        const { container, welcome } = styles;
        const display = this.state.showText ? 'Welcome to my VirtualCloset' : ' ';

        return (

            /*<ScrollView
                horizontal
            >
                <View style={{ flex: 1, backgroundColor: 'powderblue' }}>
                    <Text style={welcome}>
                        {display}
                    </Text>
                </View>
                <View style={{ flex: 2, backgroundColor: 'steelblue' }}>
                    <Image source={pic} style={{ width: 220, height: 170 }} />
                </View>
            </ScrollView>*/
            <ScrollView horizontal>
            <Text style={{fontSize:96}}>Scroll me plz</Text>
            <Text>{this.state.initialPosition}</Text>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text style={{fontSize:96}}>If you like</Text>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text style={{fontSize:96}}>Scrolling down</Text>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text style={{fontSize:96}}>What's the best</Text>
           <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text style={{fontSize:96}}>Framework around?</Text>
           <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text style={{fontSize:80}}>React Native</Text>
            </ScrollView>
        );
    }
}

const pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };

const styles = {
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
     }
};

export default ClosetList;
