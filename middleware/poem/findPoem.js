/**
 * Searching for a poem
 */
const requireOption = require("../generic/requireOption");

module.exports = function(objectrepository) {
  return function(req, res, next) {
    if(typeof req.body.tofind === 'undefined') {
      return next(); 
    }
    const PoemModel = requireOption(objectrepository, "poemModel");
    PoemModel.find({ title: req.body.tofind }, (err, poem) => {
      if (err || !poem) {
        return next(err);
      }
      res.locals.poems = poem;
      return next();
    });
  };
};
