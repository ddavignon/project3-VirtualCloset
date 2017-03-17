import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ClosetItem from './ClosetItem';

class ClosetRow extends Component {
    renderItem() {
        return this.props.items.map((uri, i) => <ClosetItem key={i} uri={uri} />);
    }
    render() {
        return (
            <View style={{ height: 150 }}>
                <ScrollView 
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    horizontal
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                >
                    {this.renderItem()}
                </ScrollView>
			</View>
        );
    }

}

export default ClosetRow;
