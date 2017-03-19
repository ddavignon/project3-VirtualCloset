import {
    CLOTHING_ITEM_UPDATE,
    CLOTHING_ITEM_CREATE,
    CLOTHING_ITEM_SELECTED,
    CLOTHING_ITEM_INFO_SUCCESS,
    CLOTHING_ITEM_INFO_FAIL
} from '../actions/types';

const INTIAL_STATE = {
    name: '',
    description: '',
    style: '',
    color: '',
    type_clothing: 'shirt',
    uri: null,
    url_path: null,
    image_data: '',
    loading: false
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case CLOTHING_ITEM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CLOTHING_ITEM_SELECTED:
            return { ...state, loading: true, uri: action.payload };
        case CLOTHING_ITEM_INFO_SUCCESS:
            return { ...state,
                description: action.payload.description,
                style: action.payload.style,
                color: action.payload.color,
                loading: false
            };
        case CLOTHING_ITEM_INFO_FAIL:
            return { ...state, loading: false };
        case CLOTHING_ITEM_CREATE:
            return INTIAL_STATE;
        default:
            return state;
    }
};
