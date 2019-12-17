
var requireOption = require('../generic/requireOption');

/**
 * Checks user data and if correct redirects to /home
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');
  
    return function (req, res, next) {
  
        console.log("BAAAAAAAAAAAA");
      //not enough parameter
      if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
        (typeof req.body.password === 'undefined')) {
        return next();
      }
  
      //lets find the user
      userModel.findOne({
        email: req.body.email
      }, function (err, result) {
        if ((err) || (!result)) {
          res.tpl.error.push('Your email address is not registered!');
          return next();
        }
  
        //check password
        if (result.password !== req.body.password) {
          res.tpl.error.push('Wrong password!');
          return next();
        }
  
        //login is ok, save id to session
        req.session.userid = result._id;

        return res.redirect('/home');
      });
    };
  
  };