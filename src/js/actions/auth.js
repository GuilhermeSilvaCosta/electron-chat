import * as api from '../api/auth';

export const register = formData => async dispatch => {
    dispatch({type: 'AUTH_REGISTER_INIT'});
    try {
        const user = await api.register(formData);
        dispatch({ type: 'AUTH_REGISTER_SUCCESS', user })
    } catch(err) {
        dispatch({ type: 'AUTH_REGISTER_ERROR', error: err });
    }
}

export const loginUser = formData => async dispatch => {
    dispatch({type: 'AUTH_LOGIN_INIT'});
    try {
        const user = await api.login(formData);
        dispatch({ type: 'AUTH_LOGIN_SUCCESS', user })
    } catch(err) {
        dispatch({ type: 'AUTH_LOGIN_ERROR', error: err });
    }
}

export const logout = () => async dispatch => {
    await api.logout();
    dispatch({ type: 'AUTH_LOGOUT_SUCCESS' });
}

export const listenToAuthChanges = () => dispatch => {
    dispatch({type: 'AUTH_ON_INIT'});
    api.onAuthStateChanges(async auth => {
        if (auth) {
            const user = await api.getUserProfile(auth.uid);
            dispatch({ type: 'AUTH_ON_SUCCESS', user });
        } else {
            dispatch({ type: 'AUTH_ON_ERROR' });
        }
    })
}