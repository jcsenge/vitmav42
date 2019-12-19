/**
 * Gives a new random temporary password
 */
const requireOption = require("../generic/requireOption");

module.exports = objRepo => async (req, res, next) => {
  if (typeof req.body.remindermail === "undefined") {
    return next();
  }
  const UserModel = requireOption(objRepo, "userModel");
  const result = await UserModel.findOne({ email: req.body.remindermail }).exec();
  if (!result) {
    res.tpl.error.push("Nincs ilyen email cím regiszrálva.");
    return next();
  }

  console.log(result);
  if (result) {
    res.locals.user = result;
    res.locals.user.password = Math.floor(Math.random()*10000)+ 'b';
    await res.locals.user.save();
    res.tpl.error.push("Az ideiglenes jelszavad: \"" + res.locals.user.password + "\". Belépés után változtasd meg!");
    return next();
  }
};
