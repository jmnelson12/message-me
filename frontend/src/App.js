import './styles/App.css';
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

function App() {
  const { current: socket } = useRef(io('http://localhost:8080'));

  useEffect(() => {
    try {
      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('testConnection', str => console.log(str));
    } catch (e) {
      console.log(e);
    }

    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <div className="App">
      My App
    </div>
  );
}

export default App;
