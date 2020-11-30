import { combineReducers } from 'redux';

import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
    userReducer,
    authReducer,
// add your reducers here
});
