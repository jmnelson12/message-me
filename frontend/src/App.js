import './styles/App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { initializeSocket } from "./lib/socket";
import { UserProvider } from "./context/user";
import UserConsumer from "./context/user";
import { GlobalProvider } from "./context/global";
import GlobalConsumer from "./context/global";
import { verify } from "./api/user";
import { getFromStorage, setInStorage, token_key } from "./lib/storage";

import MessageBoard from "./components/messageBoard";
import Navbar from "./components/navbar";
import About from "./components/sidebar/about";
import MessageStatus from "./components/messageStatus";
const Auth = React.lazy(() => import("./components/auth/auth"));

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
    const token = getFromStorage(token_key);
    verify(token).then(res => {
      if (res) {
        const {
          payload: {
            token,
            userData: _userData
          }
        } = res.data;

        setUserData(_userData);
        setIsLoggedIn(true);
        setInStorage(token_key, token);
      }
    });

    try {
      initializeSocket();
    } catch (e) {
      console.error("App.js - UseEffect: ", e);
    }
  }, []);

  return (
    <GlobalProvider>
      <UserProvider loggedIn={isLoggedIn} user={userData}>
        <UserConsumer>
          {userContext => (
            <div className="App">
              <div className="col-3 sidebar">
                {userData.isAdmin ? <div>oi</div> : <About />}
                <MessageStatus />
              </div>
              <div className="col-9">
                {/*<div className="message-wrapper">
                  <GlobalConsumer>
                    {
                      globalContext => {
                        const { type: _type, text: _text } = globalContext.globalMessage;
                        return (
                          <p className={"message " + _type}>{_text}</p>
                        )
                      }
                    }
                  </GlobalConsumer>
                  </div>*/}
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
              </div>
            </div>
          )}
        </UserConsumer>
      </UserProvider>
    </GlobalProvider>
  );
}

export default App;
