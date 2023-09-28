import * as api from '../api/chats';

export const fetchChats = () => async dispatch => {
    const chats = await api.fetchChats();
    dispatch({
        type: 'CHAT_FETCH_SUCCESS',
        chats
    });
}