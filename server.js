const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const favicon = require("express-favicon");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const sslRedirect = require("heroku-ssl-redirect");
const cors = require("cors");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

// Middleware
app.use(favicon(__dirname + "/frontend/build/favicon.ico"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// basic expressjs security
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

server.listen(port, () => console.log(`Server running on port: ${port}`));
