// import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
    ADD_CLOTHING_ITEM,
} from '../api/constants';
import {
    CLOTHING_ITEM_UPDATE,
    CLOTHING_ITEM_CREATE
} from './types';

export const clothingItemUpdate = ({ prop, value }) => {
    return {
        type: CLOTHING_ITEM_UPDATE,
        payload: { prop, value }
    };
};

export const clothingItemCreate = ({ name, description, style, color, type, uri }) => {

    return (dispatch) => {
        console.log(name);
        console.log(uri);
        axios.post(ADD_CLOTHING_ITEM, {
                name,
                description,
                style,
                color,
                type,
                uri
            })
            .then(() => {
                dispatch({ type: CLOTHING_ITEM_CREATE });
                Actions.closetList({ type: 'reset' });
            })
            .catch((error) => {
                console.log(error);
            });  
    };


    /*** 
     *
     * FIREBASE - for testing 
     * 
     ***/

    // const { currentUser } = firebase.auth();

    // return (dispatch) => {
    //     firebase.database().ref(`/users/${currentUser.uid}/closet`)
    //         .push({ name, description, style, color, type })
    //         .then(() => {
    //             dispatch({ type: CLOTHING_ITEM_CREATE });
    //             Actions.closetList({ type: 'reset' });
    //         });
    // };
};

