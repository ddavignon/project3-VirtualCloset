import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AUTH_USER, REGISTER_USER } from '../api/constants';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,     
        payload: text
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
                'Content-Type': 'application/json'
            },
            body: json
        })
        //.then((response) => response.json())
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                loginUserSuccess(dispatch, email);
            } else {
                fetch(REGISTER_USER, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        loginUserSuccess(dispatch, email);
                    } else {
                        loginUserFail(dispatch);
                    }
                });
            }      
        })
        .catch((error) => {
            loginUserFail(dispatch);
            console.log(error);
            alert('There was an error creating your account.');
        })
        .done();
    };
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(user => {
    //             console.log(user);
    //             loginUserSuccess(dispatch, user);
    //         })           
    //         .catch(() => {
    //             firebase.auth().createUserWithEmailAndPassword(email, password)
    //                 .then(user => loginUserSuccess(dispatch, user))
    //                 .catch(() => loginUserFail(dispatch));
    //         });
    // };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};
