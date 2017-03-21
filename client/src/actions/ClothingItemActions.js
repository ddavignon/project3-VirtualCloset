// import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import {
    ADD_CLOTHING_ITEM,
    UPLOAD_ITEM_IMAGE
} from '../api/constants';
import {
    CLOTHING_ITEM_UPDATE,
    CLOTHING_ITEM_CREATE,
    CLOTHING_ITEM_SELECTED,
    CLOTHING_ITEM_INFO_SUCCESS,
    CLOTHING_ITEM_INFO_FAIL
} from './types';

export const clothingItemUpdate = ({ prop, value }) => {
    return {
        type: CLOTHING_ITEM_UPDATE,
        payload: { prop, value }
    };
};

export const clothingItemResults = ({ response }) => {
    return (dispatch) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            dispatch({ type: CLOTHING_ITEM_SELECTED, payload: response.uri });
            // clothingItemUpdate({ prop: 'uri', value: response.uri });
            // clothingItemUpdate({ prop: 'loading', value: true });

            RNFetchBlob.fetch('POST', UPLOAD_ITEM_IMAGE, {
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'info', data: 'imageUpload' },
                { name: 'uri', filename: 'image.png', data: response.data }
                ])
                .then((res) => {
                    // console.log(res.json());
                    const description = res.json().apparel[0].name;
                    const style = res.json().styles[0].name;
                    const color = res.json().color;

                    console.log(res.json(), style, description);
                    clothingItemInfoSuccess(dispatch, style, description, color, response.data);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({ type: CLOTHING_ITEM_INFO_FAIL });
                });
            
            clothingItemUpdate({ prop: 'image_data', value: response.data });
        }
    };
};

export const clothingItemCreate = ({
    name, description, style, color, type_clothing, image_data
}) => {

    return (dispatch) => {
        RNFetchBlob.fetch('POST', ADD_CLOTHING_ITEM, {
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'info', data: 'itemCreate' },
                { name: 'image_data', filename: 'image.png', data: image_data },
                { name: 'name', data: name },
                { name: 'description', data: description },
                { name: 'style', data: style },
                { name: 'color', data: color },
                { name: 'type_clothing', data: type_clothing }
                ])
                .then((res) => {
                    console.log(res);
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

const clothingItemInfoSuccess = (dispatch, style, description, color) => {
    dispatch({
        type: CLOTHING_ITEM_INFO_SUCCESS,
        payload: { style, description, color }
    });
};
