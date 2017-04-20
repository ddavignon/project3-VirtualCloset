import React, { Component } from 'react';

import { Text,
    ScrollView,
    View,
    Picker,
    Alert,
    Image,
} from 'react-native';

import { connect } from 'react-redux';
import {
    loginTextFieldUpdate,
    loginUser,
    registerUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
	state = {
        showSignupFields: 'hide',
        validationCheck: 0,
	};

    onSignUpButtonPress() {
        const { email, password, phone_number, carrier } = this.props;

        let checkCount = 0;

        this.setState({
            showSignupFields: 'show',
            validationCheck: 0,
        });
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
                        <CardSection style={{ flexDirection: 'column' }}>
                            <Text style={styles.pickerTextStyle} >Carrier</Text>
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
        return (
            <Image source={require('./images/model.jpg')} style={styles.imageContainer}>
            <ScrollView style={styles.mainScrollView} >
                <Card>

                    <Text style={styles.blankTextStyle}>{ '   ' }</Text>
                    <Text>{ '    ' }</Text>
                    <Text>{ '    ' }</Text>

                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@email.com"
                            onChangeText={value => this.props.loginTextFieldUpdate({ prop: 'email', value })}
                            value={this.props.email}
                            style={styles.imageTextStyle}
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
                </Card>
            </ScrollView>
            </Image>
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
    pickerTextStyle: {
        fontSize: 18,
        paddingRight: 70,
    },

    blankTextStyle: {
        fontSize: 180,
        alignSelf: 'center',
        paddingTop: 15,

    },
    imageTextStyle: {
        color: 'black',
    },
    mainScrollView: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
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
