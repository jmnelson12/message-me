import './styles/App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { initializeSocket } from "./lib/socket";
import { UserProvider } from "./context/user";
import UserConsumer from "./context/user";

import MessageBoard from "./components/messageBoard";
import Navbar from "./components/navbar";
import About from "./components/sidebar/about";
import MessageStatus from "./components/messageStatus";
const Auth = React.lazy(() => import("./components/auth/auth"));
const MessageList = React.lazy(() => import("./components/messageList"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    isOnline: false,
    isAdmin: false
  });

  useEffect(() => {
    try {
      initializeSocket();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <UserProvider loggedIn={isLoggedIn} user={userData}>
      <UserConsumer>
        {ctx => (
          <div className="App">
            <div className="col-3 sidebar">
              {ctx.userData.isAdmin ? <div>oi</div> : <About />}
              <MessageStatus />
            </div>
            <div className="col-9">
              {ctx.userLoggedIn ?
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
            </div>
          </div>
        )}
      </UserConsumer>
    </UserProvider>
  );
}

export default App;
