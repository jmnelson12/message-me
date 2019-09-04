import './styles/App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { initializeSocket } from "./lib/socket";
import { UserProvider } from "./context/user";

import MessageBoard from "./components/messageBoard";
import Navbar from "./components/navbar";
import About from "./components/about";
import MessageStatus from "./components/messageStatus";
const Auth = React.lazy(() => import("./components/auth/auth"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <UserProvider loggedIn={isLoggedIn} user={{}}>
          {isLoggedIn ?
            (
              <>
                <Navbar />
                <MessageBoard />
              </>
            ) :
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          }
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
