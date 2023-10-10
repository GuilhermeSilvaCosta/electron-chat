import React from 'react';

function Title({ text, children }) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div>{children}</div>
    </div>
  );
}

export default Title;