import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
//import { LoginButton, AccessToken } from 'react-native-fbsdk';

class LoginForm extends Component {
	state = {
	latitudePosition: 'unknown',
	lastPosition: 'unknown',
	};
	watchID: ?number = null;
	
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
	componentDidMount() {
		navigator.geolocation.getCurrentPosition( (position) => {
												 var latitudePosition = JSON.stringify(position['coords']['latitude']);
												 this.setState({
															   latitudePosition:JSON.stringify(position['coords']['latitude']),
															   lastPosition:JSON.stringify(position['coords']['longitude'])
															   });
												 
												 },
		(error) => alert(JSON.stringify(error)),
												 {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} );
	}
	componentWillUnmount() { navigator.geolocation.clearWatch(this.watchID); }
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
						{this.state.lastPosition}
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
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);
