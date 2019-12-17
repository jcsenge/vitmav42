/**
 *  Creates the user if the email is not already taken
 */
const requireOption = require('../generic/requireOption');
module.exports = function (objectrepository) {

  var UserModel = requireOption(objectrepository, 'userModel');

  return function (req, res, next) {

    //lets find the user
    UserModel.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result !== null)) {
        res.tpl.error.push('Your email address is already registered!');
        return next();
      }

      //create user
      var newUser = new UserModel();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function (err) {
        //redirect to /index
        return res.redirect('/index');
      });
    });
  };
};