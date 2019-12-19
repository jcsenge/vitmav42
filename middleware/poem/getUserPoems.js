/**
 * Getting the user's poems
 */
const requireOption = require("../generic/requireOption");
module.exports = function(objectrepository) {
  var poemModel = requireOption(objectrepository, "poemModel");
  return async function(req, res, next) {
    const found = await poemModel.find({ _poet: req.session.user._id }).exec();
    res.locals.poems = found;
    return next();
  };
};
