/**
 * Delete current user
 */
const requireOption = require('../generic/requireOption');
module.exports = function(objectrepository) {
  return function(req, res, next) {
    return next();
  };
};
