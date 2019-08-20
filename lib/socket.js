exports.load_common_events = function(socket) {
    socket.on("disconnect", function() {
        console.log("disconnect: ", socket.id);
    });
};

exports.load_message_events = function(socket) {
    socket.on("clientMessage", msg => {
        socket.broadcast.emit("messageReceived", msg);
    });
};
