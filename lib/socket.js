exports.load_common_events = function(socket) {
    console.log("common socket events initialized");
    socket.on("disonnect", function() {
        console.log("disconnect: ", socket.id);
    });
};
