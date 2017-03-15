import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClothingItemFormReducer from './ClothingItemFormReducer';

export default combineReducers({
    auth: AuthReducer,
    clothingItemForm: ClothingItemFormReducer
});
