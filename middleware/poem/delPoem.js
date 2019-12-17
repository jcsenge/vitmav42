/**
 * Deletes the selected poem
 */
module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (typeof res.locals.poem === 'undefined') {
      return next();
  }
  res.locals.poem.remove(err => {
    if (err) {
        return next(err);
    }
    return res.redirect(`/poems/${res.locals.poem._id}`);
  });
};
};
