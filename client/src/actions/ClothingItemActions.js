import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
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
        
        const testImageName = `${description}--${new Date()}.jpg`;

        Blob.build(RNFetchBlob.wrap(image_data.origURL), { type: 'image/jpeg' })
            .then((blob) => firebase.storage()
                    .ref('images')
                    .child(testImageName)
                    .put(blob, { contentType: 'image/png' })
            )
            .then((snapshot) => {
                console.log(snapshot);
                // axios.post(ADD_CLOTHING_ITEM.concat(name), {
                //     // name, description, style, color, type_clothing, url_path: snapshot.downloadURL
                //     name, description, style, color, type_clothing, url_path: snapshot.downloadURL
                // }, {
                //     'Content-Type': 'application/json',
                // })
                // .then((res) => {
                //     console.log(res);
                //     dispatch({ type: CLOTHING_ITEM_CREATE });
                //     Actions.closetList({ type: 'reset' });
                // })
                // .catch((error) => {
                //     console.log('axios error', error);
                // });
                // // console.log('snaphot', snapshot.downloadURL);
                // /* there we go ! */ 

                const itemPath = description.concat(style).concat(type_clothing);

                fetch(ADD_CLOTHING_ITEM.concat(itemPath), {
                    method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT '.concat(token)
                    },
                    body: JSON.stringify({
                        description,
                        style,
                        type_clothing,
                        url_path: snapshot.downloadURL
                    })
                })
                .then((res) => {
                    console.log(res);
                    dispatch({ type: CLOTHING_ITEM_CREATE });
                    Actions.closetList({ type: 'reset' });
                })
                .catch((error) => {
                    console.log('fetch error', error);
                });
                // console.log('snaphot', snapshot.downloadURL);
            })
            .catch((error) => {
                console.log('upload', error);
            });
        };

    //     RNFetchBlob.fetch('POST', ADD_CLOTHING_ITEM, {
    //             'Content-Type': 'multipart/form-data',
    //         }, [
    //             { name: 'info', data: 'itemCreate' },
    //             { name: 'image_data', filename: 'image.png', data: image_data },
    //             { name: 'name', data: name },
    //             { name: 'description', data: description },
    //             { name: 'style', data: style },
    //             { name: 'color', data: color },
    //             { name: 'type_clothing', data: type_clothing }
    //             ])
    //             .then((res) => {
    //                 console.log(res);
    //                 dispatch({ type: CLOTHING_ITEM_CREATE });
    //                 Actions.closetList({ type: 'reset' });
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    // };


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

// clothing item save

// clothing item delete

const clothingItemInfoSuccess = (dispatch, description) => {
    dispatch({
        type: CLOTHING_ITEM_INFO_SUCCESS,
        payload: { description }
    });
};
