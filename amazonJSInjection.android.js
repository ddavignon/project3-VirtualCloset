'use strict';

import React from 'react-native';
let { AppRegistry, View, WebView, StyleSheet} = React;

let MyApp extends React.Component {
constructor(props){
  super(props);
}
render() {
    let html = `
        <div id="myContent">
            This is my name
        </div>
    `;
    let jsCode = `
        document.querySelector('#myContent').style.backgroundColor = 'red';
    `;
    return (
        <View style={styles.container}>
            <WebView
                style={styles.webView}
                ref="myWebView"
                html={html}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
	<script type="text/javascript">
        amzn_assoc_placement = "adunit0";
        amzn_assoc_tracking_id = "virtualclos02-20";
        amzn_assoc_ad_mode = "search";
        amzn_assoc_ad_type = "smart";
        amzn_assoc_marketplace = "amazon";
        amzn_assoc_region = "US";
        amzn_assoc_title = "Shop Related Products";
        amzn_assoc_default_search_phrase = "shoes";
        amzn_assoc_default_category = "All";
        amzn_assoc_linkid = "30ebc2adc8e49a62ef366120292307ad";
        amzn_assoc_search_bar = "true";
        amzn_assoc_search_bar_position = "top";
      </script>
      <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
            >
            </WebView>
        </View>
    );
}
});

let styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
webView: {
    backgroundColor: '#fff',
    height: 350,
}
});

AppRegistry.registerComponent('MyApp', () => MyApp);