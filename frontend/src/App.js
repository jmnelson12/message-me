import './styles/App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { initializeSocket } from "./lib/socket";
import { UserProvider } from "./context/user";
import UserConsumer from "./context/user";
import { GlobalProvider } from "./context/global";
import GlobalConsumer from "./context/global";
import { verify } from "./api/user";
import { getFromStorage, setInStorage, token_key } from "./lib/storage";

import Navbar from "./components/navbar";
import About from "./components/sidebar/about";
import MessageStatus from "./components/messageStatus";
const MessageBoard = React.lazy(() => import("./components/messageBoard"));
const Auth = React.lazy(() => import("./components/auth/auth"));
const Contacts = React.lazy(() => import("./components/sidebar/contacts"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    isOnline: false,
    isAdmin: false
  });
  const [globalMessage, setGlobalMessage] = useState({
    type: "",
    text: ""
  });

  useEffect(() => {
    const token = getFromStorage(token_key);
    verify(token).then(res => {
      if (res && res.data.success) {
        const {
          payload: {
            token,
            userData: _userData
          }
        } = res.data;

        setIsLoggedIn(true);
        setUserData(_userData);
        setInStorage(token_key, token);
      }
      setIsLoading(false);
    });

    try {
      initializeSocket();
    } catch (e) {
      console.error("App.js - UseEffect: ", e);
    }
  }, []);

  const handleKeypress = function () {
    if (globalMessage.type && globalMessage.text) {
      setGlobalMessage({
        type: "",
        text: ""
      });
    }
  }

  return (
    <div className="App" onKeyPress={handleKeypress}>
      <GlobalProvider globalMessage={globalMessage} setGlobalMessage={setGlobalMessage}>
        <UserProvider isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData}>
          <UserConsumer>
            {userContext => (
              <>
                {isLoading ?
                  <div>Loading...</div> :
                  <>
                    <div className="col-3 sidebar">
                      {
                        userContext.userData.isAdmin ?
                          <Suspense fallback={<div>Loading...</div>}>
                            <Contacts />
                          </Suspense> :
                          <About />
                      }
                      <MessageStatus />
                    </div>
                    <div className="col-9 pos-rel">
                      <div className="global message-wrapper">
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
                      </div>
                      {userContext.isLoggedIn ? (
                        <>
                          <Navbar />
                          <Suspense fallback={<div>Loading...</div>}>
                            <MessageBoard />
                          </Suspense>
                        </>) :
                        <Suspense fallback={<div>Loading...</div>}>
                          <Auth />
                        </Suspense>
                      }
                    </div>
                  </>
                }
              </>
            )}
          </UserConsumer>
        </UserProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
