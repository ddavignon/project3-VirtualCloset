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
    CLOTHING_ITEM_INFO_FAIL,
    CLOTHING_ITEM_IMAGE_UPLOAD,
    CLOTHING_ITEM_IMAGE_UPLOAD_FAIL
} from './types';


export const clothingItemUpdate = ({ prop, value }) => {
    console.log(prop, value);
    return {
        type: CLOTHING_ITEM_UPDATE,
        payload: { prop, value }
    };
};

export const clothingItemResults = ({ response, token }) => {
    return (dispatch) => {
        console.log('Response = ', response, response.uri);
        const uri = response.uri;
        const data = response;

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            dispatch({ type: CLOTHING_ITEM_SELECTED, payload: { uri, image_data: data } });

            RNFetchBlob.fetch('POST', UPLOAD_ITEM_IMAGE, {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'JWT ' + token,
            }, [
                { name: 'info', data: 'imageUpload' },
                { name: 'uri', filename: 'image.png', data: response.data }
                ])
                .then((res) => {
                    // console.log(res.json());
                    console.log(res);
                    const description = res.json().apparel[0].name;
                    // const style = res.json().styles[0].name;
                    // const color = res.json().color;

                    console.log(res.json(), description);
                    clothingItemInfoSuccess(dispatch, description);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({ type: CLOTHING_ITEM_INFO_FAIL });
                });
        }
    };
};

export const clothingItemCreate = ({
    description, style, type_clothing, image_data, token
}) => {
    return (dispatch) => {
        // Prepare Blob support
        const Blob = RNFetchBlob.polyfill.Blob;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        dispatch({ type: CLOTHING_ITEM_IMAGE_UPLOAD });

        const urlToken = Math.random().toString(36).slice(-8);

        RNFetchBlob.fetch('POST', ADD_CLOTHING_ITEM.concat(urlToken), {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'JWT '.concat(token)
            }, [
                { name: 'info', data: 'itemCreate' },
                { name: 'image_data', filename: urlToken.concat('-image.png'), data: image_data.data },
                { name: 'description', data: description },
                { name: 'style', data: style },
                { name: 'type_clothing', data: type_clothing }
                ])
                .then((res) => {
                    console.log(res);
                    dispatch({ type: CLOTHING_ITEM_CREATE });
                    Actions.closetList({ type: 'reset' });
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({ type: CLOTHING_ITEM_IMAGE_UPLOAD_FAIL });
                });
    };
};

// clothing item save

// clothing item delete

const clothingItemInfoSuccess = (dispatch, description) => {
    dispatch({
        type: CLOTHING_ITEM_INFO_SUCCESS,
        payload: { description }
    });
};
