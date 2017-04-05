import React, { Component } from 'react';
import { Text, View, Platform} from 'react-native';
import { connect } from 'react-redux';
import {
    loginTextFieldUpdate,
    loginUser,
    registerUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
//import { LoginButton, AccessToken } from 'react-native-fbsdk';
const Permissions = require('react-native-permissions');

class LoginForm extends Component {
	state = {
	latitudePosition: 'unknown',
	longitudePosition: 'unknown',
	locationPermission: 'undetermined',
  showSignupFields: 'hide',
	};

    onEmailChanged(text) {
        this.props.emailChanged(text);
    }

    onPasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    onSignUpButtonPress() {
        const { email, password, phone_number, carrier } = this.props;
        this.setState({showSignupFields: 'show'});
        if(this.state.showSignupFields === 'show'){
            this.props.registerUser({ email, password, phone_number, carrier });
        }

    }

    _renderSIgnupFields() {
        if(this.state.showSignupFields === 'show'){
            return(
                   <View>
                   <Card>
                       <CardSection>
                           <Input
                           label="Phone"
                           placeholder="555-555-5555"
                           onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'phone_number', value })}
                           value={this.props.phone_number}
                           />
                       </CardSection>
                       <CardSection>
                           <Input
                           label="Carrier"
                           placeholder="ATT"
                           onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'carrier', value })}
                           value={this.props.carrier}
                           />
                       </CardSection>
                   </Card>
                   </View>
            );
        } else {
            return null;
        }
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }
    renderButton() {
        if (this.props.loading) {
            return (
                <CardSection>
                    <Spinner size="large" />
                </CardSection>
            );
        }

        return (

            <View>
                {this.state.showSignupFields === 'hide'
                    ?(<CardSection>
                        <Button onPress={this.onLoginButtonPress.bind(this)}>
                            Login
                        </Button>
                    </CardSection>)
                    :null
                  }
                <CardSection>
                    <Button onPress={this.onSignUpButtonPress.bind(this)}>
                        Sign Up
                    </Button>
                </CardSection>
            </View>
        );
    }

    componentWillMount(){
        Permissions.getPermissionStatus('location','whenInUse')
          .then(response => {
            //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ locationPermission: response })
        });
        navigator.geolocation.getCurrentPosition( (position) => {
         this.setState({
                       latitudePosition:JSON.stringify(position['coords']['latitude']),
                       longitudePosition:JSON.stringify(position['coords']['longitude'])
                       });
         },
         (error) => {
            console.log(error);
          //    if(Platform.OS === 'android'){
          //    async function requestCameraPermission() {
          //    try {
          //    const granted = await PermissionsAndroid.request(
          //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          //         'title': 'Cool Fashion App needs location Permission',
          //         'message': 'Cool Fashion App needs access to your location ' + 'so you can acces the weather.'
          //         }
          //         )
          //    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //    navigator.geolocation.getCurrentPosition( (position) => {
          //         this.setState({
          //                       latitudePosition:JSON.stringify(position['coords']['latitude']),
          //                       longitudePosition:JSON.stringify(position['coords']['longitude'])
          //                       });
          //         },
          //         (error) => alert(JSON.stringify(error)),{
          //         enableHighAccuracy: true,
          //         timeout: 20000,
          //         maximumAge: 1000}
          //         );
          //    } else {
          //    console.log("Location permission denied")
          //    }
          //    } catch (err) {
          //    console.warn(err)
          //    }
          //  }
         },{
         enableHighAccuracy: true,
         timeout: 20000,
         maximumAge: 1000}
         );
      
    }


    render() {

        return (
                <View>
            <Card>
            	<CardSection>
					<Text>
						<Text style={styles.title}>LocPermission:</Text>
						{this.state.locationPermission}
					</Text>
                </CardSection>
                <CardSection>
                    <Text>
                        <Text style={styles.title}>showsignup:</Text>
                        {this.state.showSignupFields}
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
                        onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'email', value })}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'password', value })}
                        value={this.props.password}
                    />
                </CardSection>
            </Card>
                <View>
                {this._renderSIgnupFields()}
                </View>
                <Text style={styles.errorTextStyle} >
                {this.props.error}
                </Text>
            <Card>
                {this.renderButton()}
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
        </View>
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
    const { email, password, phone_number, carrier, error, loading, token } = auth;
    return { email, password, phone_number, carrier, error, loading, token };
};

export default connect(mapStateToProps, {
    loginTextFieldUpdate,
    loginUser,
    registerUser
})(LoginForm);
