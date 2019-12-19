var authMW = require("../middleware/generic/auth");
var invAuthMW = require("../middleware/generic/invAuth");
var renderMW = require("../middleware/generic/render");

var getUserPoems = require("../middleware/poem/getUserPoems");
var getOnePoem = require("../middleware/poem/getOnePoem");
var getPoems = require("../middleware/poem/getPoems");
var delPoem = require("../middleware/poem/delPoem");
var findPoem = require("../middleware/poem/findPoem");
var savePoem = require("../middleware/poem/savePoems");

var userModel = require("../models/user");
var poemModel = require("../models/poem");

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    poemModel: poemModel
  };

  /**
   * List found poems
   */

  app.use(
    "/poems/find",
    invAuthMW(objectRepository, "index"),
    findPoem(objectRepository),
    renderMW(objectRepository, "list")
  );

  /**
   * List all poems
   */

  app.use(
    "/poems",
    invAuthMW(objectRepository, "index"),
    getPoems(objectRepository),
    findPoem(objectRepository),
    renderMW(objectRepository, "list")
  );

  /**
   * Add new poem
   */

  app.use(
    "/home/new",
    invAuthMW(objectRepository, "index"),
    savePoem(objectRepository),
    renderMW(objectRepository, "new")
  );

  /**
   * Edit selected poem
   */

  app.use(
    "/home/edit/:poemid",
    invAuthMW(objectRepository, "index"),
    getOnePoem(objectRepository),
    savePoem(objectRepository),
    renderMW(objectRepository, "new")
  );

  /**
   * Delete selected poem
   */

  app.use(
    "/home/del/:poemid",
    invAuthMW(objectRepository, "index"),
    delPoem(objectRepository)
  );

  /**
   * Find a poem (by name)
   */

  app.use(
    "/poem/find",
    invAuthMW(objectRepository, "index"),
    //findPoem(objectRepository),
    //getPoems(objectRepository),
    renderMW(objectRepository, "list")
  );

  /**
   * List user's poems
   */
  app.use(
    "/home",
    invAuthMW(objectRepository, "index"),
    getUserPoems(objectRepository),
    renderMW(objectRepository, "home")
  );
};
