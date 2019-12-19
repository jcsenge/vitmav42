/**
 *  Creates the user if the email is not already taken
 **/
const requireOption = require("../generic/requireOption");

module.exports = objRepo => async (req, res, next) => {
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.password === "undefined" ||
    typeof req.body.email === "undefined"
  ) {
    return next();
  }

  const UserModel = requireOption(objRepo, "userModel");

  const eredmeny = await UserModel.findOne({ email: req.body.email }).exec();

  //javascript falsy
  if (eredmeny) {
    res.tpl.error.push("Your email address is already registered!");
    return next();
  }

  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  await newUser.save();
  return res.redirect("/index");
};
