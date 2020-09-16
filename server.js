const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const session = require('express-session')
const chalk = require('chalk')
// Powering realtime experiences
// const pusher = require("pusher");

// USE CUSTOM MODULES
import * as constant from "./app/helpers/constant";
const port = constant.config.port || 8001;
import LoggingService from "./app/services/LoggingService";

const app = express();
const server = http.createServer(app);

// Global variables
global.__base = __dirname

app.set("port", process.env.PORT || port);
// Static folder
app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));
// view engine
app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser());
app.use(session({ secret: constant.config.utils.SESSION_SECRET, cookie: { maxAge: 60000 } }))
morgan.token("process-ip", function (req) { return req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.ip || "" });

// app.use(morgan(':process-ip - :date - ":method :url HTTP/:http-version" - :status - :res[content-length] - :response-time ms', { stream: { write: function (msg) { return LoggingService.consoleLog("MORGAN", msg) } } }));
// app.use(morgan('dev')).red

app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, safeFileNames: true, abortOnLimit: true, }));

// ENABLE OR INITIATE ROUTES
require('./routes/index')(app);

// Redirect to client/build to serve html for any router other than /api
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "./client/build")));

    app.get("/testing-prod", (req, res) => {
        res.status(200).json({ status: true, message: "Working Fine" });
    });

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.status(200).json({ status: true, message: "Working Fine" });
    });

    app.get("*", (req, res) => {
        res.json({ message: "404 Error" });
    });

}

server.listen(app.get("port") || 8001, "127.0.0.1");

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    };
};
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(chalk.bgGreen.black('Server Listening on My custom ' + bind));
};
server.on('error', onError);
server.on('listening', onListening);
