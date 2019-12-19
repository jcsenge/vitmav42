const expect = require('chai').expect;
const Schema = require("mongoose").Schema;
const authMW = require('../../../middleware/generic/auth');

describe('Auth middleware ', function () {
  it('If the user is logged in, redirects to /home', function (done) {
    const reqMock = {
      session: {
        loggedin: true
      }
    }; 
    const resMock = {
      redirect: function (param) 
      {
        expect(param).to.eql("/home");
        done();
      }
    }; 
      authMW({})(reqMock,resMock,()=>{});
      
  });

  it('If the user is not logged in, calls next', function (done) {
    const reqMock = {
      session: {
      }
    }; 
      authMW({})(reqMock,{},()=>{done();});
      
  });
});