import React from 'react';

export default function MessageList({ messageData }) {
    const messageList = messageData.map((msg, i) => <li key={i}>{msg}</li>);

    return (
        <ul>
            {messageList}
        </ul>
    )
}
