import './styles/App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(['message one', 'message two']);

  const messageList = messages.map((msg, i) => <li key={i}>{msg}</li>);

  useEffect(() => {
    try {
      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('messageReceived', msg => {
        setMessages([...messages, msg]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function handleMessageSend() {
    socket.emit('clientMessage', message);
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="App">
      <textarea onChange={handleMessageChange} name="txtArea" id="txtArea" cols="30" rows="10"></textarea>
      <br/>
      <button onClick={handleMessageSend}>Send</button>
      <br/>
      <div className="messages">
        <ul>
          {
            messageList
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
