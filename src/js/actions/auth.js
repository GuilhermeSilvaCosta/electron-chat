import * as api from '../api/auth';

export const register = formData => async dispatch => {
    await api.register(formData);
    dispatch({ type: 'AUTH_REGISTER_SUCCESS' });
}

export const listenToAuthChanges = () => dispatch => {
    dispatch({type: 'AUTH_ON_INIT'});
    api.onAuthStateChanges(user => {
        if (user) {
            dispatch({type: 'AUTH_ON_SUCCESS', user});
        } else {
            dispatch({type: 'AUTH_ON_ERROR'});
        }
    })
}