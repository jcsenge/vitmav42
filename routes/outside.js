var renderMW = require("../middleware/generic/render");
var authMW = require("../middleware/generic/auth");
var logoutMW = require("../middleware/generic/logout");
//var inverseAuthMW = require("../middleware/generic/inverseAuth");
var loginMW = require("../middleware/generic/login");
var userModel = require("../models/user");
var poemModel = require("../models/poem");
const reminderMW = require("../middleware/generic/reminder");

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    poemModel: poemModel
  };
  /**
   * Password reminder
   */
  app.use(
    "/reminder",
    reminderMW(objectRepository),
    renderMW(objectRepository, "index")
  );
  /**
   * Login page
   */
  app.use(
    "/index",
    authMW(objectRepository, "home"),
    reminderMW(objectRepository),
    loginMW(objectRepository),
    renderMW(objectRepository, "index")
  );

  /**
   * Logout
   */
  app.get("/logout", logoutMW(objectRepository));

  app.use(
    "/",
    authMW(objectRepository, "home"),
    reminderMW(objectRepository),
    loginMW(objectRepository),
    renderMW(objectRepository, "index")
  );
};
