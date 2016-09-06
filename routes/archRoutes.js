var express = require('express');


var routes = function(Architecture){
    var archRouter = express.Router();
    var ObjectId = (require('mongoose').Types.ObjectId);
    var archController =  require('../controllers/archController' )(Architecture) ;

    archRouter.route('/')
        .post(archController.post)
        .get(archController.get);

    archRouter.use('/:id', function(req, res, next){
        console.log('\n\n\tMiddleware->Pre-populate records for restful calls. ' + req.params.id);

        Architecture.findById(ObjectId(req.params.id), function(err, arch) {
            if (err) {
                console.log('Err finding record.' + err);
                res.status(500).send(err);
            } else if (arch) {
                console.log('\t\tRecord Found!!');
                req.arch = arch;
                next();

            } else {
                console.log('record not found.' + err);
                res.status(404).send('Record was not found.');
            }
        });

    });

    archRouter.route('/:id')
        .get(archController.getById)
        .put(function(req, res){
            req.arch.element = req.body.element;
            req.arch.function= req.body.function;
            req.arch.framework  = req.body.framework;
            req.arch.active= req.body.active;
            req.arch.save(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.json( req.arch);
                }
            });

        }).patch(function(req,res){
            if (req.body._id){
                delete req.body._id;
            }
            for( var p in req.body){
                console.log('patching');
                req.arch[p]= req.body[p];
            }
            req.arch.save( function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.json( req.arch);
                }
            })
        }).delete(function(req,res){
           req.arch.remove(function(err){
                if(err){
                    console.log('Cannot Remove Record: ' + err);
                    res.status(500).send(err);
                }else{
                    res.status(204).send('Record was removed.');
                }
            });

        }) ;




























return archRouter;
};





module.exports=routes;
