const express = require("express");
const router = express.Router();
const AdminController = require("../app/controllers/AdminController");
const userAuth = require("../middleware/authPermissions");

router.route("/scrap-movies").get(AdminController.FetchMovies);

router.route("/login").post(AdminController.OnUserLogin);

router.route("/self").get(userAuth, AdminController.OnUserSelfInfo);

router.route("/get-movies").get(userAuth, AdminController.GetMovies);



module.exports = router;
