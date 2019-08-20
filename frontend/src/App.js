import './styles/App.css';
import React, { useEffect } from 'react';
import { initializeSocket } from "./lib/socket";
import MessageBoard from "./components/messageBoard";

function App() {
  useEffect(() => {
    try {
      initializeSocket();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="App">
      <div className="col-3"></div>
      <div className="col-7">
        <MessageBoard />
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default App;
