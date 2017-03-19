// import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
    ADD_CLOTHING_ITEM
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

export const clothingItemCreate = ({ name, description, style, color, type_clothing, image_data }) => {

    return (dispatch) => {
        RNFetchBlob.fetch('POST', ADD_CLOTHING_ITEM, {
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'info', data: 'imageUpload' },
                { name: 'uri', filename: 'image.png', data: image_data },
                { name: 'name', data: name },
                { name: 'description', data: description },
                { name: 'style', data: style },
                { name: 'color', data: color },
                { name: 'type_clothing', data: type_clothing }
                ])
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

