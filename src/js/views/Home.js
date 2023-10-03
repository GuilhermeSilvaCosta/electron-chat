import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import JoinedChats from '../components/JoinedChats';
import AvailableChats from '../components/AvailableChats';
import Title from '../components/shared/Title';
import { fetchChats } from '../actions/chats';

function Home() {

  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats.items);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch])

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats chats={chats} />
      </div>
      <div className="col-9 fh">
        <Title text="Choose your channel" />
        <AvailableChats chats={chats} />
      </div>
    </div>
  );
}

export default Home;