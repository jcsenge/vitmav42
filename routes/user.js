var authMW = require("../middleware/generic/auth");
//var invAuthMW = require("../middleware/generic/inverseAuth");
var renderMW = require("../middleware/generic/render");
var saveUser = require("../middleware/user/saveUser");
var getUser = require("../middleware/user/getUser");
var delUser = require("../middleware/user/delUser");
var registerUser = require("../middleware/user/registerUser");

var userModel = require('../models/user');
var poemModel = require('../models/poem');

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
    //invAuthMW(objectRepository),
    //authMW(objectRepository),
    registerUser(objectRepository),
    //saveUser(objectRepository),
    renderMW(objectRepository,'registration')
  );

  /**
   * Edit user details
   */

  app.use(
    "/home/profile/:userid",
    //authMW(objectRepository),
    //getUser(objectRepository),
    //saveUser(objectRepository),
    renderMW(objectRepository,"user")
  );

  /**
   * Delete user then redirect to /index
   */

  app.use(
    "/profile/profile/del/:userid",
    //authMW(objectRepository),
    //getUser(objectRepository),
    //delUser(objectRepository),
    function(req, res, next) {
      return res.redirect("/index");
    }
  );
};
