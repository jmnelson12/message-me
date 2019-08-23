import './styles/App.css';
import React, { useEffect } from 'react';
import { initializeSocket } from "./lib/socket";
import { UserProvider } from "./context/user";

import MessageBoard from "./components/messageBoard";
import Navbar from "./components/navbar";
import About from "./components/about";
import MessageStatus from "./components/messageStatus";

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
      <div className="col-3 sidebar">
        <About />
        <MessageStatus />
      </div>
      <div className="col-9">
        <UserProvider loggedIn={false} user={{}}>
          <Navbar />
          <MessageBoard />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
