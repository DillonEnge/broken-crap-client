import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';

import thunk from 'redux-thunk';

import { LOGIN } from './constants/LOGIN';

import { FIELD } from './constants/FIELD';

import loginState from './states/login';

import fieldState from './states/field';

// actions.js
// login logic
export const creatingLogin = () => ({
    type: LOGIN.CREATING_LOGIN
});
export const loggingIn = () => ({
    type: LOGIN.LOGGING_IN
});
export const logIn = (username) => ({
    type: LOGIN.LOG_IN,
    username
});
export const logOut = () => ({
    type: LOGIN.LOG_OUT
});
// field logic
export const addToFields = (id, field) => ({
    type: FIELD.ADD_TO_FIELDS,
    field,
    id
});
export const clearFields = () => ({
    type: FIELD.CLEAR_FIELDS
});


// reducers.js
export const loginReducer = (state = loginState, action) => {
	switch (action.type) {
        case LOGIN.CREATING_LOGIN:
            return Object.assign({}, state, {
                creatingAccount: true
            });
        case LOGIN.LOGGING_IN:
            return Object.assign({}, state, {
                creatingAccount: false
            });
        case LOGIN.LOG_IN:
            return Object.assign({}, state, {
                loggedIn: true,
                username: action.username
            });
        case LOGIN.LOG_OUT:
            return Object.assign({}, state, {
                loggedIn: false,
                username: ''
            });
        default:
            return state;
    }
};

export const fieldReducer = (state = fieldState, action) => {
	switch (action.type) {
        case FIELD.ADD_TO_FIELDS:
            return Object.assign({}, state, {
                [action.id]: action.field
            });
        case FIELD.CLEAR_FIELDS:
            return Object.assign({});
        default:
            return state;
    }
};


export const reducers = combineReducers({
    loginReducer,
    fieldReducer
});

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    )
    return store;
};

export const store = configureStore();