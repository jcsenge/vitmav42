var authMW = require("../middleware/generic/auth");
var invAuthMW = require("../middleware/generic/invAuth");
var logoutMW = require("../middleware/generic/logout");
var renderMW = require("../middleware/generic/render");
var editUser = require("../middleware/user/editUser");
var getUser = require("../middleware/user/getUser");
var delUser = require("../middleware/user/delUser");
var registerUser = require("../middleware/user/registerUser");

var userModel = require("../models/user");
var poemModel = require("../models/poem");

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    poemModel: poemModel
  };
  /**
   * Register new user
   */

  app.use(
    "/register",
    authMW(objectRepository, "home"),
    registerUser(objectRepository),
    renderMW(objectRepository, "registration")
  );

  /**
   * Edit user details
   */

  app.use(
    "/home/profile/:userid",
    invAuthMW(objectRepository, "index"),
    getUser(objectRepository),
    editUser(objectRepository),
    renderMW(objectRepository, "user")
  );

  /**
   * Delete user then redirect to /index
   */
  app.use(
    "/profile/del/:userid",
    invAuthMW(objectRepository, "index"),
    delUser(objectRepository),
    logoutMW(objectRepository)
  );
};
