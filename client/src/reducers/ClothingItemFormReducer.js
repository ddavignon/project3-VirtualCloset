import {
    CLOTHING_ITEM_UPDATE,
    CLOTHING_ITEM_CREATE
} from '../actions/types';

const INTIAL_STATE = {
    name: '',
    description: '',
    style: '',
    color: '',
    type: '' 
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case CLOTHING_ITEM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CLOTHING_ITEM_CREATE:
            return INTIAL_STATE;
        default:
            return state;
    }
};
