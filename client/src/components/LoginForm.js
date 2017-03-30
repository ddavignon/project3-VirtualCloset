import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
    loginTextFieldUpdate,
    loginUser,
    registerUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
//import { LoginButton, AccessToken } from 'react-native-fbsdk';

class LoginForm extends Component {
	state = {
        latitudePosition: 'unknown',
        longitudePosition: 'unknown',
    };

    onSignUpButtonPress() {
        const { email, password, phone_number, carrier } = this.props;

        this.props.registerUser({ email, password, phone_number, carrier });
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
                <CardSection>
                    <Button onPress={this.onLoginButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSignUpButtonPress.bind(this)}>
                        Sign Up
                    </Button>
                </CardSection>
            </View>
        );
    }
	componentDidMount() {
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
                <Text style={styles.errorTextStyle} >
                    {this.props.error}
                </Text>
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
