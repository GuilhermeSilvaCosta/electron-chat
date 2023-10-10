import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import JoinedChats from '../components/JoinedChats';
import AvailableChats from '../components/AvailableChats';
import Title from '../components/shared/Title';
import { fetchChats } from '../actions/chats';
import Notification from '../utils/notifications';

function Home() {

  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats.items);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch])

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats chats={chats} />
      </div>
      <div className="col-9 fh">
        <Title text="Choose your channel">
          <Link
            className="btn btn-outline-primary"
            to="/chatCreate"
          >
            New
          </Link>
        </Title>
        <AvailableChats chats={chats} />
      </div>
    </div>
  );
}

export default Home;