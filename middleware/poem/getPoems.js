/**
 * Getting every poem
 */
const requireOption = require('../generic/requireOption');
module.exports = function(objectrepository) {
  const PoemModel = requireOption(objectrepository, 'poemModel');

    return function(req, res, next) {
      /*PoemModel.find({}, (err, poems) => {
            if (err) {
                return next(err);
            }

            res.locals.poems = poems;
          });
           */
          return next();
    };
};