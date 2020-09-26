// enums

const configServer = require("../../configExample");
module.exports.config = configServer;


module.exports.MESSAGE_NOT_ALLOWED = "Not allowed to access customer services";
module.exports.MESSAGE_AUTH_ERROR = "You are Unauthorized.";
module.exports.MESSAGE_NOT_FOUND_ERROR = "Not found. Please try after sometime.";
module.exports.MESSAGE_DB_ERROR = "Something went wrong while processing data.";
module.exports.MESSAGE_APP_ERROR = "Something went wrong while processing data.";

// Response Messages

module.exports.RESPONSE_MESSAGES = {
    CODE_400: "Auth Token is required. Please provide a valid auth token along with request.",
    CODE_401: "You need to login to view this",
    CODE_403: "You are forbidden from seeing this",
    CODE_404: "The resource referenced by request does not exists.",
    CODE_405: "Requested method is not valid",
    CODE_408: "Request getting too much time. please try after some time",
    CODE_500: "Something went wrong on server. Please contact server admin.",
    CODE_501: "We will patch no such thing",
    CODE_503: "Requested service is unavailable for this time",
    CODE_200: "Success",
    CODE_201: "Created",
    CODE_422: "Something went wrong, Database error",
};

module.exports.CUSTOM_RESPONSE_MESSAGES = {
    USER_RES: "Custom Response message will come here"
}