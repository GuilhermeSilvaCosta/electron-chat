import React from 'react';

function Title({ text }) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
    </div>
  );
}

export default Title;