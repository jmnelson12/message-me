import './styles/App.css';
import React, { useEffect } from 'react';
import { initializeSocket } from "./lib/socket";
import MessageBoard from "./components/messageBoard";
import Navbar from "./components/navbar";

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
      <div className="col-9">
        <Navbar />
        <MessageBoard />
      </div>
    </div>
  );
}

export default App;
