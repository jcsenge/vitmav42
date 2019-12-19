/**
 * If the user is not logged in, redirects to /index
 */
const requireOption = require("./requireOption");
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (
      typeof req.session.loggedin == "undefined" ||
      req.session.loggedin !== true
    ) {
      return res.redirect("/index");
    }
    return next();
  };
};
