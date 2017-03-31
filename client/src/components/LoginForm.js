import React, { Component } from 'react';
import { Text, View, Platform} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
//import { LoginButton, AccessToken } from 'react-native-fbsdk';
const Permissions = require('react-native-permissions');

class LoginForm extends Component {
	state = {
	latitudePosition: 'unknown',
	longitudePosition: 'unknown',
	locationPermission: 'undetermined',
	};
	
    onEmailChanged(text) {
        this.props.emailChanged(text);
    }
    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }
    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }
    
    componentWillMount(){
    Permissions.getPermissionStatus('location','whenInUse')
      .then(response => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined' 
        this.setState({ locationPermission: response })
      });
      //for some reason android crashes as it asks for permission
      // if(this.state.locationPermission =='undetermined'){
//         	Permissions.requestPermission('location')
//         		.then(response => {
//         			this.setState({locationPermission: response})
//         		});
//         }
    }
    
	componentDidMount() {
	//This if statement crashes on android
			// if(this.state.locationPermission =='undetermined'){
//         	Permissions.requestPermission('location')
//         		.then(response => {
//         			this.setState({locationPermission: response})
//         		});
//         	}
		// if(Platform.OS === 'android'){
// 			async function requestCameraPermission() { 
// 				try { 
// 					const granted = await PermissionsAndroid.request( 
// 						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, { 
// 							'title': 'Cool Fashion App needs location Permission', 
// 							'message': 'Cool Fashion App needs access to your location ' + 'so you can acces the weather.' 
// 						} 
// 					) 
// 					if (granted === PermissionsAndroid.RESULTS.GRANTED) { 
// 						navigator.geolocation.getCurrentPosition( (position) => {
// 							this.setState({
// 							   latitudePosition:JSON.stringify(position['coords']['latitude']),
// 							   longitudePosition:JSON.stringify(position['coords']['longitude'])
// 							   });
// 							},
// 						(error) => alert(JSON.stringify(error)),{
// 							enableHighAccuracy: true,
// 							timeout: 20000,
// 							maximumAge: 1000}
// 																 );
// 					} else { 
// 						console.log("Location permission denied") 
// 					} 
// 				} catch (err) { 
// 					console.warn(err) 
// 				} 
// 			}
// 		}
			navigator.geolocation.getCurrentPosition( (position) => {
				this.setState({
				   latitudePosition:JSON.stringify(position['coords']['latitude']),
				   longitudePosition:JSON.stringify(position['coords']['longitude'])
				   });
				},
			(error) => alert(JSON.stringify(error)),{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000}
													 );
		
	}
    render() {
        
        return (
            <Card>
            	<CardSection>
					<Text>
						<Text style={styles.title}>LocPermission:</Text>
						{this.state.locationPermission}
					</Text>
				</CardSection>
				<CardSection>
					<Text>
						<Text style={styles.title}>Latitude:</Text>
						{this.state.latitudePosition}
					</Text>
				</CardSection>
				<CardSection>
					<Text>
						<Text style={styles.title}>Longitude:</Text>
						{this.state.longitudePosition}
					</Text>
				
				</CardSection>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@email.com"
                        onChangeText={this.onEmailChanged.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChanged.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle} >
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                {/*<LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                    if (error) {
                        alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        alert("login is cancelled.");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            alert(data.accessToken.toString())
                        }
                        )
                    }
                    }
                }
                onLogoutFinished={() => alert("logout.")}
            />*/}
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, token } = auth;
    return { email, password, error, loading, token };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
