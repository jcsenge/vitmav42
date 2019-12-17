/**
 * Gettin the user's poems
 const requireOption = require('../generic/requireOption');
 
 module.exports = function(objectrepository) {
   const UserPoemsModel = requireOption(objectrepository, 'UserPoemsModel');
   
   return function(req, res, next) {
     if (typeof res.locals.user === 'undefined') {
       return next();
      }
      
      BefottModel.find({ _befozo: res.locals.user._id }, (err, poems) => {
        if (err) {
          return next(err);
        }
        
        res.locals.poems = poems;
        return next();
      });
    };
  };
  
  */

 const requireOption = require('../generic/requireOption');
 module.exports = function(objectrepository) {
   var userModel = requireOption(objectrepository, "userModel");
   return function(req, res, next) {
     res.locals.poems = 
     [
      {
          title : "Nyar",
          text : 'Még nyílnak a völgyben a kerti virágok, Még zöldell a nyárfa az ablak előtt, De megkapom egyszer a diplomámat Talán még a nyugdíj előtt.',
          _poet : {
              ref: 'User'
          }
        },
        {
          title : 'Akarmi',
          text : ' egyszer a diplomámat Talán még a nyugdíj előtt.',
          _poet : {
              ref: 'User2'
          }
        }
     ];
     return next();
   };
 };
 