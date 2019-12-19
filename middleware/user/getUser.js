/**
 * Loads the user data, checks whether ok
 */
const requireOption = require("../generic/requireOption");
module.exports = function(objectrepository) {
  var UserModel = requireOption(objectrepository, "userModel");
  return function(req, res, next) {
    UserModel.findOne({ _id: req.params.userid }, (err, user) => {
      if (err || !user) {
        return next(err);
      }
      res.locals.user = user;
      return next();
    });
  };
};
