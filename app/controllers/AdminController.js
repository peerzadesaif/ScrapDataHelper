const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const collection = require("../common/collection");
const constant = require("../helpers/constant");
const securityClient = require("../securityService/securityClient");


module.exports.FetchMovies = async (req, res) => {
  console.log('First')
  try {
    let movieJson = {};

    request('https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating', async (error, response, html) => {
      let $ch = cheerio.load(html)
      const { list } = await collection.getCheerioMovies($ch);
      await fs.unlink(`${__base}/Json/Movies.json`);

      if (!fs.existsSync(`${__base}/Json/Movies.json`)) {
        fs.writeFile(`${__base}/Json/Movies.json`);
      }
      const adapter = new FileSync(`${__base}/Json/Movies.json`)
      const db = low(adapter);
      db.defaults({ movies: [] })
        .write()
      db.get('movies')
        .push(...list)
        .write();

      return res.status(200).json({ message: 'file screped', movieList: list })
    })
  } catch (error) {
    console.log('error', error)
    return res.json({ message: "Error", error })
  }
}


module.exports.OnUserLogin = async (req, res) => {
  if (req.body.email == 'saif.pirjade@gmail.com' && req.body.password === '1234') {
    const setEncryptedData = securityClient.encrypt(JSON.stringify({ email: req.body.email, password: req.body.password }))
    const token = securityClient.jwtEncode({ encryptToken: setEncryptedData })
    req.token = token;
    res.setHeader("x-auth-token", token);
    res.set("x-auth-token", token);
    res.status(200).json({ message: "User Successfully Logged In", status: true, token })
  } else {
    res.status(200).json({ message: "Please verify your email id and password", status: false, token })
  }
}

module.exports.OnUserSelfInfo = async (req, res) => {
  const verify = securityClient.jwtVerify(req.headers["x-auth-token"]);
  if (!verify) return res.status(401).json({ message: constant.MESSAGE_NOT_ALLOWED })
  let jwtDecode = securityClient.jwtDecode(req.headers["x-auth-token"]);
  if (!jwtDecode) return res.status(401).json({ message: constant.MESSAGE_NOT_ALLOWED })
  console.log('self jwtDecode', jwtDecode)
  const user = JSON.parse(securityClient.decrypt(jwtDecode.encryptToken));

  console.log('self user', user)
  res.status(200).json({ message: "Successfully ", status: true, user })
}

module.exports.GetMovies = async (req, res) => {
  const adapter = new FileSync(`${__base}/Json/Movies.json`)
  const db = low(adapter);
  const movies = db
    .get('movies')
    .value();
  return res.status(200).json({ message: 'success', movies: movies })
}
