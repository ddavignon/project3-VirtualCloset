import React, { Component } from 'react';
import { Text,
    View,
    Picker,
    Platform,
    PermissionsAndroid,
    Alert,
    TouchableHighlight
} from 'react-native';
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
        validationCheck: 0,
	};

    // componentWillMount() {
    //     Permissions.getPermissionStatus('location', 'whenInUse')
    //       .then(response => {
    //         //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //         this.setState({ locationPermission: response });
    //     });
    // }

    onSignUpButtonPress() {
        const { email, password, phone_number, carrier } = this.props;
        this.setState({ validationCheck: 0 });
        var checkCount = 0;
        this.setState({ showSignupFields: 'show' });
        if (this.state.showSignupFields === 'show') {
          if (this.validateEmail(email)) {
              checkCount++;
              this.setState({ validationCheck: checkCount });
          } else {
              Alert.alert(
                  'Error',
                  'Email format: user@email.com',
              );
          }
          if (this.validatePassword(password)) {
              checkCount++;
              this.setState({ validationCheck: checkCount });
          } else {
              Alert.alert(
                  'Error',
                  'Password must be more than 8 chars ' +
                  'and contain uppercase, lowercase, ' + 'digit, and special character.',
              );
          }
          if (this.validatePhone(phone_number)) {
              checkCount++;
              this.setState({ validationCheck: checkCount });
          } else {
              Alert.alert(
                  'Error',
                  'Phone format: 123-123-1234',
              );
          }
          if (this.state.validationCheck === 3) {
            this.props.registerUser({ email, password, phone_number, carrier });
          }
        }
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        if (this.state.showSignupFields === 'hide') {
            this.props.loginUser({ email, password });
        }
        this.setState({ showSignupFields: 'hide' });
    }

    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
       this.setState({
                     latitudePosition: JSON.stringify(position.coords.latitude),
                     longitudePosition: JSON.stringify(position.coords.longitude)
                     });
       },
       (error) => {
          console.log(error);
       }, {
       enableHighAccuracy: true,
       timeout: 20000,
       maximumAge: 1000 }
       );
    }

    validateEmail(email) {
      const emailRe = /([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
      return emailRe.test(email);
    }

    validatePhone(phone_number) {
      const phoneRe = /\d{3}[-]{1}\d{3}[-]{1}\d{4}\b/;
      return phoneRe.test(phone_number);
    }

    validatePassword(password) {
      const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      return passwordRe.test(password);
    }

    async requestLocationPermission() {
        try {
             const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
             'title': 'Cool Fashion App needs location Permission',
             'message': 'Cool Fashion App needs access to your location so you can acces the weather.'
             }
             )
             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                 this.getLocation();
             } else {
                 console.log('Location permission denied')
             }
        } catch (err) {
             console.warn(err);
        }
     }

    renderSIgnupFields() {
        if (this.state.showSignupFields === 'show') {
            return (
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
                       {/*<CardSection>
                           <Input
                           label="Carrier"
                           placeholder="ATT"
                           onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'carrier', value })}
                           value={this.props.carrier}
                           />
                       </CardSection>*/}
                        <CardSection style={{ flexDirection: 'column' }}>
                            <Text>Carrier</Text>
                            <Picker
                                style={{ flex: 1 }}
                                selectedValue={this.props.carrier}
                                onValueChange={value => this.props.loginTextFieldUpdate({ prop: 'carrier', value })}
                            >
                                <Picker label="ATT" value="att" />
                                <Picker label="T-Mobile" value="tmobile" />
                                <Picker label="Verizon" value="verizon" />
                                <Picker label="Sprint" value="sprint" />
                            </Picker>
                        </CardSection>
                   </Card>
                   </View>
            );
        }
        return null;
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
                <CardSection>
                    {this.state.showSignupFields === 'hide'
                        ? (<Button onPress={this.onLoginButtonPress.bind(this)}>
                                Login
                            </Button>)
                        : (<Button onPress={this.onLoginButtonPress.bind(this)}>
                                Back
                            </Button>)
                    }
                    <Button onPress={this.onSignUpButtonPress.bind(this)}>
                        Sign Up
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
      if (this.state.locationPermission === 'authorized') {
        this.getLocation();
      } else {
        if (Platform.OS === 'android') {
        this.requestLocationPermission();
        }
      }

        return (
            <View>
                <Card>
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
                            placeholder="P@5sword"
                            onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'password', value })}
                            value={this.props.password}
                        />
                    </CardSection>
                </Card>
                    <View>
                        {this.renderSIgnupFields()}
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
    },
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
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
