/**
 * If the user is not logged in, redirects to /home
 */
const requireOption = require('./requireOption');
module.exports = function (objectrepository) {

  return function (req, res, next) {
    if(typeof req.session.loggedin == 'undefined' || req.session.loggedin !== true) {
      return res.redirect('/home');
    }
    return next();
  };

};