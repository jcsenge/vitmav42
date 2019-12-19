/**
 * Rendering content into template
 */
const requireOption = require("./requireOption");

module.exports = function(objectrepository, viewName) {
  return function(req, res) {
    res.locals.user = req.session.user;
    res.render(viewName, res.tpl);
  };
};
