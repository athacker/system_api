var should = require('should'),
    request = require('supertest');
    app = require('../app.js'),
    mongoose=require('mongoose'),
    //Architecture = mongoose.model('Architecture'),
    Architecture = require('../models/archModel.js'),
    agent = request.agent(app);

describe('Crud Test', function(){

   it('should allow a post - test for _id field', function(done){
       var archPost = {element:'orm', function:'software', framework:'mongoose'}

       agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Unit Test Err: ' + err );
                done();
            }else{
                results.body.active.should.equal(true);
                results.body.should.have.property('_id');
                done();
            }


       })
   }) ;

    it('should allow a post - test for _id field', function(done){
        var archPost = {element:'orm', function:'software', framework:'mongoose'}

        agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Unit Test Err: ' + err );
                done();
            }else{

                agent.get('/api/architecture/'+results.body._id).end(function(err,results){
                    if(err){
                        console.log('Unit Test Err: ' + err );
                        done();
                    }else{
                        results.body.active.should.equal(true);
                        results.body.should.have.property('element');
                        done();
                    }
                })

            }


        })
    }) ;



    afterEach(function(done){
    //    Architecture.remove().exec();
        done();
    });

});