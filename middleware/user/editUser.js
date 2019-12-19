/**
 *  Edit the selected user's credentials
 */

const requireOption = require("../generic/requireOption");

module.exports = function(objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function(req, res, next) {
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined" ||
      typeof req.body.passwordagain === "undefined"
    ) {
      return next();
    }
    if (req.body.password !== req.body.passwordagain) {
      res.tpl.error.push("A két jelszó nem egyezik!");
      return next();
    }
    res.locals.user.name = req.body.name;
    res.locals.user.email = req.body.email;
    res.locals.user.password = req.body.password;

    res.locals.user.save(err => {
      if (err) {
        return next(err);
      }
    });
    return res.redirect("/logout");
  };
};
