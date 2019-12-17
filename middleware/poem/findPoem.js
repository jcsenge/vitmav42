/**
 * Searching for a poem
 */
const requireOption = require('../generic/requireOption');

module.exports = function(objectrepository) {
  const PoemModel = requireOption(objectrepository, 'PoemModel');

  return function(req, res, next) {
      PoemModel.findOne({ _id: req.params.poemid }, (err, poem) => {
          if (err || !poem) {
              return next(err);
          }

          res.locals.poem = poem;
          return next();
      });
  };
};
