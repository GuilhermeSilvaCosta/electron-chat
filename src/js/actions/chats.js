import * as api from '../api/chats';
import db from '../db/firestore';

export const fetchChats = () => async dispatch => {
    const chats = await api.fetchChats();
    dispatch({
        type: 'CHAT_FETCH_SUCCESS',
        chats
    });
}

export const createChat = (formData, userId) => async dispatch => {
    const newChat = {...formData};
    const useRef = db.doc(`profiles/${userId}`);
    newChat.admin = useRef;
    newChat.joinedUsers = [useRef];
  
    const _ = await api
        .createChat(newChat);
    return dispatch({ type: 'CHATS_CREATE_SUCCESS' });
}