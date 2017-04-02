import {
    CLOTHING_ITEM_UPDATE,
    CLOTHING_ITEM_CREATE,
    CLOTHING_ITEM_SELECTED,
    CLOTHING_ITEM_INFO_SUCCESS,
    CLOTHING_ITEM_INFO_FAIL,
    CLOTHING_ITEM_IMAGE_UPLOAD,
    CLOTHING_ITEM_IMAGE_UPLOAD_FAIL
} from '../actions/types';

const INTIAL_STATE = {
    name: '',
    description: '',
    style: '',
    type_clothing: 'shirt',
    uri: null,
    url_path: null,
    image_data: null,
    loading: false
};

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case CLOTHING_ITEM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CLOTHING_ITEM_IMAGE_UPLOAD:
            return { ...state, loading: true };
        case CLOTHING_ITEM_IMAGE_UPLOAD_FAIL:
            return { ...state, loading: false };
        case CLOTHING_ITEM_SELECTED:
            return { ...state,
                loading: true,
                uri: action.payload.uri,
                image_data: action.payload.image_data
            };
        case CLOTHING_ITEM_INFO_SUCCESS:
            return { ...state,
                description: action.payload.description,
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
