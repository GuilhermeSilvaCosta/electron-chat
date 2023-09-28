import React from 'react';
import { useNavigate } from 'react-router-dom';

import ChatSearch from './ChatSearch';

function JoinedChats({ chats }) {

  const navigate = useNavigate();

  function handleClickChannel(id) {
    navigate(`/chat/${id}`);
  }

  return (
    <div className="list-container">
      <ChatSearch />
      <ul className="items">
        {chats.map(chat =>
          <li
            key={chat.id}
            onClick={() => handleClickChannel(chat.id)}
            className="item"
          >
            <div className="item-status">
              <img src={chat.image} alt={chat.name} />
              <span className="status online"></span>
            </div>
            <p className="name-time">
            <span className="name mr-2">{chat.name}</span>
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default JoinedChats;