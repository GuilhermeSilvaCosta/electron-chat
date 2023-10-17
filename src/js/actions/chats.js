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
    newChat.admin = db.doc(`profiles/${userId}`);
  
    const chatId = await api.createChat(newChat);
    dispatch({ type: 'CHATS_CREATE_SUCCESS' });

    await api.joinChat(userId, chatId);
    dispatch({type: 'CHATS_JOIN_SUCCESS'});
    
    return chatId;
}