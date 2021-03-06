import '../styles/MessageBoard.css';
import React, { useState, Suspense } from 'react';
import { sendMessage } from "../lib/socket";

const MessageList = React.lazy(() => import('./messageList'));

function MessageBoard() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(['message one', 'message two']);

    function handleMessageSend(e) {
        if (e.keyCode === 13) {
            sendMessage(message);
            setMessage('');
        }
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }



    return (
        <div className="messageBoard">
            <div className="messageList">
                <Suspense fallback={<div>Loading...</div>}>
                    <MessageList messageData={messages} />
                </Suspense>
            </div>
            <div className="messageInput">
                <input
                    type="text"
                    name="txtMessage"
                    id="txtMessage"
                    value={message}
                    placeholder={"Type a message..."}
                    onChange={handleMessageChange}
                    onKeyDown={handleMessageSend}
                />
            </div>
        </div>
    )
}
export default MessageBoard;


/**
 * <textarea onChange={handleMessageChange} name="txtArea" id="txtArea" cols="30" rows="10"></textarea>
            <br />
            <button onClick={handleMessageSend}>Send</button>
            <br />
            <div className="messages">
                <ul>
                    {
                        messageList
                    }
                </ul>
            </div>
 */
