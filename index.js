const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
const chalk = require("chalk");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const constant = require("./app/helpers/constant");

var whitelist = ["http://localhost:3000", "https://saif-scrap-helper.herokuapp.com"];
var corsOptions = {
    exposedHeaders: ["x-auth-token"],
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

//create express application
const app = express();
const server = http.createServer(app);

// Global variables
global.__base = __dirname;

/**
 * MIDDLEWARES
 */

// set up cors to allow us to accept requests from our client
// app.use(cors(corsOptions));
app.use(cors());

app.use(morgan("dev"));
// gzip compression
app.use(compression());

app.use(helmet());
//making body available to read in request object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ENABLE OR INITIATE ROUTES
require('./routes')(app);

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

// Redirect to client/build to serve html for any router other than /api
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "./client/build")));

    app.get("/testing-prod", (req, res) => {
        res.status(200).json({ status: true, message: "Working Fine" });
    });

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"


const port = process.env.PORT || constant.config.port || 4001;

// 🌎 Listen to PORT
server.listen(port, () =>
    console.log(chalk.magenta(`server eavesdropping on port ${port}`))
);
