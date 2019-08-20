import io from 'socket.io-client';
const socket = io('http://localhost:8080');

function initializeSocket() {
    socket.on('connect', () => {
        console.log('connected');
    });

    socket.on('messageReceived', msg => {
        //setMessages([...messages, msg]);
        console.log(msg);
    });
}

function sendMessage(msg) {
    socket.emit('clientMessage', msg);
}

export { initializeSocket, sendMessage }
// export default initialize;
