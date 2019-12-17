var authMW = require("../middleware/generic/auth");
var renderMW = require("../middleware/generic/render");

var getUserPoems = require("../middleware/poem/getUserPoems");
var getOnePoem = require("../middleware/poem/getOnePoem");
var getPoems = require("../middleware/poem/getPoems");
var delPoem = require("../middleware/poem/delPoem");
var findPoem = require("../middleware/poem/findPoem");
var savePoem = require("../middleware/poem/savePoems");

var userModel = require('../models/user');
var poemModel = require('../models/poem');

module.exports = function(app) {
  var objectRepository = {
    userModel: userModel,
    poemModel: poemModel
  };
  
  /**
   * List all poems
   */
  
  app.use(
    "/poems",
    //authMW(objectRepository),
    getPoems(objectRepository),
    renderMW(objectRepository, "list")
    );
    
    /**
     * Add new poem
     */
    
    app.use(
      "/home/new",
      //authMW(objectRepository),
      //savePoem(objectRepository),
      renderMW(objectRepository, "new")
      );
      
      /**
       * Edit selected poem
       */
      
      app.use(
        "/home/edit/:poemid",
        //authMW(objectRepository),
        //getOnePoem(objectRepository),
        //savePoem(objectRepository),
        renderMW(objectRepository, "new")
        );
        
        /**
         * Delete selected poem
         */
        
        app.use(
          "/home/del/:poemid",
          //authMW(objectRepository),
          //getOnePoem(objectRepository),
          //delPoem(objectRepository),
          function(req, res, next) {
            return res.redirect("/home");
          }
          );
          
          /**
           * Find a poem (by name)
           */
          
          app.use(
            "/poem/find",
            //authMW(objectRepository),
            //findPoem(objectRepository),
            //getPoems(objectRepository),
            renderMW(objectRepository, "list")
            );
            
            /**
             * List user's poems
             */
            app.use(
              "/home",
              //authMW(objectRepository),
              getUserPoems(objectRepository),
              renderMW(objectRepository, "home")
            );
          };