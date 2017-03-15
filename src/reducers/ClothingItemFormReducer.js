import {
    CLOTHING_ITEM_UPDATE
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
        default:
            return state;
    }
};
