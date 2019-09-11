import React, { createContext, useState } from "react";
const { Provider, Consumer } = createContext();

const GlobalProvider = ({ children }) => {
    const [globalMessage, setGlobalMessage] = useState({
        type: "",
        text: ""
    });

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
