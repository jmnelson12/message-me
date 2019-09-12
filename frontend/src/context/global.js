import React, { createContext } from "react";
const { Provider, Consumer } = createContext();

const GlobalProvider = ({ children, globalMessage, setGlobalMessage }) => {
    return (
        <Provider
            value={{
                globalMessage,
                setGlobalMessage
            }}
        >
            {children}
        </Provider>
    );
};

export { GlobalProvider };

// making this default because it will be used most
export default Consumer;
