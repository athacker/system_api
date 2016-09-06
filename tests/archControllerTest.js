var should = require('should'),
    sinon = require('sinon');


describe('Architecture Test', function(){


    describe('Post', function(){
        //set up mocks
        it('Do not allow empty values fields', function(){
           var MockArchitecture = function(arc){
                this.save=function(){console.log('Mocked Save Event'); } ;
           }

           var req={
               body:{
                   function:'data storage'
               }
           }


            var res={
                status:sinon.spy(),
                send:sinon.spy()
            }


            //call the methods to test
            var archController = require('../controllers/ArchController')(MockArchitecture);
            archController.post(req,res);


            //validate test results
            res.status.calledWith(400).should.equal(true, 'Bad Status + res.status.args[0][0]');
            res.send.calledWith('Field is required').should.equal(true);
        });



    });



});
