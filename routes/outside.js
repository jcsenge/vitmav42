//var checkPassMW = require("../middleware/generic/checkPass");
var renderMW = require("../middleware/generic/render");
var authMW = require("../middleware/generic/auth");
var logoutMW = require("../middleware/generic/logout");
//var handlePassMW = require("../middleware/generic/handleWrongPW");
//var inverseAuthMW = require("../middleware/generic/inverseAuth");
var loginMW = require("../middleware/generic/login");
var userModel = require('../models/user');
var poemModel = require('../models/poem');

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    poemModel: poemModel
  };
  /**
   * Login page
   */
  app.use(
    "/index",
    loginMW(objectRepository),
    //checkPassMW(objectRepository),
    renderMW(objectRepository,'index')
    );
    
    
    /**
     * Main page
     */
    app.get("/logout", logoutMW(objectRepository), function(req, res, next) {
      res.redirect("/");
    });
    app.use("/",
    //inverseAuthMW(objectRepository),
    renderMW(objectRepository, 'index')
    );
  };
  