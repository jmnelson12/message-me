import React, { createContext } from "react";
const { Provider, Consumer } = createContext();

const UserProvider = ({ children, isLoggedIn, setIsLoggedIn, userData, setUserData }) => {
  return (
    <Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData
      }}
    >
      {children}
    </Provider>
  );
};

export { UserProvider };

// making this default because it will be used most
export default Consumer;
