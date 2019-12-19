/**
 * Searching for a poem
 */
const requireOption = require("../generic/requireOption");

module.exports = function(objectrepository) {
  const PoemModel = requireOption(objectrepository, "poemModel");
  return function(req, res, next) {
    console.log(req.body.tofind);
    if(typeof req.body.tofind === 'undefined') {
       return next(); 
      }
    PoemModel.find({ title: req.body.tofind }, (err, poem) => {
      if (err || !poem) {
        return next(err);
      }
      res.locals.poems = poem;
      return next();
    });
  };
};
