const expect = require('chai').expect;
const Schema = require("mongoose").Schema;
const findPoemMW = require('../../../middleware/poem/findPoem');

describe('findPoem middleware ', function () {
  it('If there\'s nothing to find, it should call next', function (done) {
      const reqMock = {
        body: {}
      };
      findPoemMW({})(reqMock,{},()=>{
        done();
      });
      
  });
  it('If no such poem or error, should call next with param "err" ', function (done) {
    const reqMock = {
      body: {
          tofind: "random"
      }
    }; 
    findPoemMW({
        poemModel: {
            find: function  (param,cb) {
                cb('err',"poem")
            }
    }
    })(reqMock,{},(err)=>{
        expect(err).to.eql('err');
        done();
    });
    
});

it('Finds a poem', function (done) {
    const reqMock = {
      body: {
          tofind: "poem"
      }
     }; 
     const res = {
        locals:{
               poem : ""
        }
   }
    findPoemMW({
        poemModel: {
            find: function  (param,cb) {
                cb('',"poem")
            }
    }
    })(reqMock,res,(err)=>{
        expect(err).to.eql(undefined);
        done();
    });
    
});

});