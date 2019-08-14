const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const favicon = require("express-favicon");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketLib = require("./lib/socket");
const port = process.env.PORT || 8080;
const sslRedirect = require("heroku-ssl-redirect");
const isDev = process.env.NODE_ENV !== "production";

// Middleware
app.use(favicon(__dirname + "/frontend/build/favicon.ico"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// basic expressjs security
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

io.on("connection", socket => {
    console.log(" %s sockets connected", io.engine.clientsCount);
    socketLib.load_common_events(socket);

    io.emit("testConnection", "someone connected");
});

server.listen(port, () => console.log(`Server running on port: ${port}`));
