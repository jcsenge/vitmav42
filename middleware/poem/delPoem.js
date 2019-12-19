/**
 * Deletes the selected poem
 */
const requireOption = require("../generic/requireOption");
module.exports = function(objectrepository) {
  return async function(req, res, next) {
    const PoemModel = requireOption(objectrepository, "poemModel");
    await PoemModel.findOneAndDelete({ _id: req.params.poemid }).exec();
    return res.redirect("/home");
  };
};
