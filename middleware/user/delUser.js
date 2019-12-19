/**
 * Delete current user
 */
const requireOption = require("../generic/requireOption");
module.exports = function(objectrepository) {
  return async function(req, res, next) {
    const userModel = requireOption(objectrepository, "userModel");
    const poemModel = requireOption(objectrepository, "poemModel");
    await userModel.findOneAndDelete({ _id: req.params.userid }).exec();
    await poemModel.remove({ _poet: req.params.userid }).exec();
    return next();
  };
};
