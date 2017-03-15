import firebase from 'firebase';
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

export const clothingItemCreate = ({ name, description, style, color, type }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database()ref(`/users/${currenUser.uid}/closet`)
            .push({ name, description, style, color, type })
            .then(() => {
                dispatch({ type: CLOTHING_ITEM_CREATE });
                Actions.closetList({ type: 'reset' });
            });
    };
};

