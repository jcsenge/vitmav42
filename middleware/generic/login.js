/**
 * Checks user data and if correct redirects to /home
 */
const requireOption = require("../generic/requireOption");

module.exports = objRepo => async (req, res, next) => {
  if (
    typeof req.body.email === "undefined" ||
    typeof req.body.password === "undefined"
  ) {
    return next();
  }

  const UserModel = requireOption(objRepo, "userModel");

  const result = await UserModel.findOne({ email: req.body.email }).exec();

  //javascript falsy
  if (!result) {
    res.tpl.error.push("Your email address is not registered!");
    return next();
  }

  //check password
  if (result.password !== req.body.password) {
    res.tpl.error.push("Wrong password!");
    return next();
  }
  req.session.loggedin = true;
  req.session.user = result;
  return res.redirect("/home");
};
