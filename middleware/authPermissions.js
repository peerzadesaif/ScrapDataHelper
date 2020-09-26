const securityClient = require("../app/securityService/securityClient");
const constant = require("../app/helpers/constant");

module.exports = function (req, res, next) {
  if (!req || !req.headers || !req.headers["x-auth-token"]) {
    return res.status(401).end();
  }
  const verify = securityClient.jwtVerify(req.headers["x-auth-token"]);
  if (!verify) return res.status(401).json({ message: constant.MESSAGE_NOT_ALLOWED })
  let jwtDecode = securityClient.jwtDecode(req.headers["x-auth-token"]);
  if (!jwtDecode) return res.status(401).json({ message: constant.MESSAGE_NOT_ALLOWED })
  console.log('jwtDecode', jwtDecode)
  const user = JSON.parse(securityClient.decrypt(jwtDecode.encryptToken));
  console.log('user', user)
  req.user = user;
  return next();
};
