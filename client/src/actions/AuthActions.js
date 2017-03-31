// import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import {
    AUTH_USER,
    REGISTER_USER,
    REGISTER_USER_CLOSET
} from '../api/constants';
import {
    LOGIN_ITEM_UPDATE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const loginTextFieldUpdate = ({ prop, value }) => {
    return {
        type: LOGIN_ITEM_UPDATE,
        payload: { prop, value }
    };
};

export const registerUser = ({ email, password, phone_number, carrier }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        const data = {
            username: email,
            password
        };
        // Serialize and post the data
        const json = JSON.stringify(data);
        fetch(REGISTER_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: json
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response);
                RNFetchBlob.fetch('POST', AUTH_USER, {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, json)
                .then((res) => {
                    const token = res.json().access_token;
                    console.log(token);
                    fetch(REGISTER_USER_CLOSET.concat(email), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + token
                        },
                        body: JSON.stringify({
                            phone_number,
                            carrier
                        })
                    })
                    .then((resp) => console.log(resp))
                    .catch((err) => console.log(err));
                    loginUserSuccess(dispatch, email, token); 
                }); 
            } else {
                loginUserFail(dispatch);
            }
        });
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        const data = {
            username: email,
            password
        };
        // Serialize and post the data
        const json = JSON.stringify(data);
        fetch(AUTH_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                RNFetchBlob.fetch('POST', AUTH_USER, {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, json)
                .then((res) => { 
                    loginUserSuccess(dispatch, email, res.json().access_token); 
                });  
            } else {
                loginUserFail(dispatch);
            }      
        })
        .catch((error) => {
            loginUserFail(dispatch);
            console.log(error);
            alert('There was an error logging in to your account.');
        })
        .done();
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, token) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token }
    });

    Actions.main();
};
