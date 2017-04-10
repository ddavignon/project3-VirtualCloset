
import React, { Component } from 'react';
import {View,Text,TouchableHighlight,Platform} from 'react-native';
import { STTandroid, STTios } from 'react-native-speech-to-text';





  class Voice extends Component{
    constructor(props) {
    super(props);
    this.state={speechToText:"",voiceError:""}
  }
    handlePress() {
      console.log('Pressed!');
      if(Platform.OS === 'android'){STTandroid.showGoogleInputDialog()
          .then((result) => {
          this.setState({speechToText:result});
              console.log(result)
          })
          .catch((error) => {
            this.setState({voiceError:error})
              console.log(error)
          })
        }

    }
    render() {
      return(
        <TouchableHighlight
        onPress={() => this.handlePress()}>
        <View style={{width: 200, height: 50}}>
        <Text>
        {this.state.speechToText}
        {this.state.voiceError}
        </Text>
        </View>
        </TouchableHighlight>
      );

    }
  }



export {Voice};
