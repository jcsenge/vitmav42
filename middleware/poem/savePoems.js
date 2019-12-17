/**
 * Create (or edit the selected) poem
 */
const requireOption = require('../generic/requireOption');

module.exports = function(objectrepository) {
    const poemModel = requireOption(objectrepository, 'poemModel');

    return function(req, res, next) {
        if (
            typeof req.body.title === 'undefined' ||
            typeof req.body.text === 'undefined' ||
            typeof res.locals.poet === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.poem === 'undefined') {
            res.locals.poem = new poemModel();
        }


        res.locals.poem.title = req.body.title;
        res.locals.poem.text = req.body.text;
        res.locals.poem._poet = res.locals.poet._id;

        res.locals.poem.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/poem/${res.locals.poet._id}`);
        });
    };
};
