import {
    LOGIN_ITEM_UPDATE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    //email: '',
    password: '',
    phone_number: '',
    carrier: '',
    user: null,
    error: '',
    loading: false,
    token: null
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ITEM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case LOGIN_USER_SUCCESS:
            return { ...state,
                ...INITIAL_STATE,
                user: action.payload.user,
                token: action.payload.token
            };
        case LOGIN_USER_FAIL:
            return { 
                ...state,
                error: 'Authentication Failed.',
                password: '',
                loading: false
            };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};
