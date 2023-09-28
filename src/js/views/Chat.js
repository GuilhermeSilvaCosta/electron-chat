import React from 'react';
import { useParams } from 'react-router-dom';

import ViewTitle from '../components/shared/Title';
import ChatUserList from '../components/ChatUserList';
import ChatMessagesList from '../components/ChatMessagesList';

function Chat() {
  const { id } = useParams();

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`}/>
        <ChatMessagesList />
      </div>
    </div>
  );
}

export default Chat;