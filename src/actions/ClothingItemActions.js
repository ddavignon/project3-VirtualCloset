import {
    CLOTHING_ITEM_UPDATE
} from './types';

export const clothingItemUpdate = ({ prop, value }) => {
    return {
        type: CLOTHING_ITEM_UPDATE,
        payload: { prop, value }
    };
};
