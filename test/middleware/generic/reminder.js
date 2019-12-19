const expect = require('chai').expect;
const Schema = require("mongoose").Schema;
const reminderMW = require('../../../middleware/generic/reminder');

describe('reminder middleware ', function () {
  it('If there was no new password request should call next', function (done) {
    const reqMock = {
      body: {}
    }; 
      reminderMW({})(reqMock,{},()=>{done()});
      
  });

  it('Email not registered should render error message', function (done) {
    const resMock = {
      tpl: {
        error: {
          push: function(string){
            expect(string).to.eql("Nincs ilyen email cím regiszrálva.");
          }
        }
      }
    }
    const reqMock = {
      body: {
        remindermail : "randomail"
      }
    }; 
      reminderMW({
        userModel: {
          findOne: function  (param) {
            
          }

      }})(reqMock,resMock,()=>{
        done()});
      
  });

  it('New password', function (done) {
    const userMock = {
      save: function (){}
    }
    const resMock = {
      tpl: {
        error: {
          push: function(string){
            return ;
          }
        }
      },
      locals: {
        user: userMock
      }
    }
    const reqMock = {
      body: {
        remindermail : "randomail"
      }
    }; 
      reminderMW({
        userModel: {
          findOne: function  (param) {
            return userMock;
          }

      }})(reqMock,resMock,()=>{
        done();});
      
  });

});