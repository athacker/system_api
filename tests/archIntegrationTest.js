var should = require('should'),
    request = require('supertest');
    app = require('../app.js'),
    mongoose=require('mongoose'),
    //Architecture = mongoose.model('Architecture'),
    Architecture = require('../models/archModel.js'),
    agent = request.agent(app);

describe('Crud Test', function(){

   it('should allow POST - test for _id field', function(done){
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

    it('should allow a GET from a recently posted record.', function(done){
        var archPost = {element:'quality-front-end', function:'software', framework:'protractor -- selenium'};

        agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Itegration Test Err: ' + err );
                done();
            }else{
                agent.get('/api/architecture/'+results.body._id).end(function(err,results){
                    if(err){
                        console.log('Itegration Test Err: ' + err );
                        done();
                    }else{
                        results.body.active.should.equal(true);
                        results.body.should.have.property('element');

                    }
                })

            }

            done();
        })

    }) ;


    it('Should allow a PUT from a recently posted record', function(done){
       var archPost = {element:'front end ', function:'software', framework:'angular'};
       agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Integration Test Err: ' + err );
                done();
            }else{
                var archPut = {element:'Front-End Framework', function:'software', framework:'angular'};
                agent.put('/api/architecture/'+results.body._id).set('Accept', 'application/json').type('form').send(archPut).end(function(err,results){
                    if(err){
                        console.log('Integration Test Err: ' + err );
                        done();
                    }else{
                        results.body.element.should.equal('Front-End Framework');
                        results.body.should.have.property('element');

                    }
                })

            }
           done();
        })
  });

    it('Should allow PATCH from a recently posted record', function(done){
        var archPost = {element:'BACK END', function:'software', framework:'Mocha'};
        agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Integration Test Err: ' + err );
                done();
            }else{
                var archPatch = {_id:123, element:'Back-End Framework', function:'software', framework:'Mocha'};
                var origId = results.body._id;
                agent.put('/api/architecture/'+results.body._id).set('Accept', 'application/json').type('form').send(archPatch).end(function(err,results){
                    if(err){
                        console.log('Integration Test Err: ' + err );
                        done();
                    }else{
                        results.body._id.should.equal(origId);
                        results.body.element.should.equal('Back-End Framework');
                        results.body.should.have.property('element');

                    }
                })
            }
            done();
        })

    });



    it('Should allow a DELETE from a recently posted record', function(done){
        var archPost = {element:'BACK END', function:'software', framework:'Mocha'};
        agent.post('/api/architecture').set('Accept', 'application/json').type('form').send(archPost).expect(201).end(function(err,results){
            if(err){
                console.log('Integration Test Err: ' + err );
                done();
            }else{
                agent.delete('/api/architecture/'+results.body._id).send(results.body).expect(204).end(function(err,results){
                    if(err){
                        console.log('Integration Test Err: ' + err );
                    }
                })
            }
            done();
        })
    });




    afterEach(function(done){
    //    Architecture.remove().exec();
        done();
    });

});