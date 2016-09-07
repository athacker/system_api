var express = require('express');


var routes = function(Architecture){
    var archRouter = express.Router();
    var ObjectId = (require('mongoose').Types.ObjectId);
    var archController =  require('../controllers/archController' )(Architecture) ;

    //middleware to pre-populate the req before hitting the controller
    archRouter.use('/:id', function(req, res, next){
        Architecture.findById(ObjectId(req.params.id), function(err, arch) {
            if (err) {
                console.log('Middleware Err pre-set record record.' + err);
                res.status(500).send(err);
            } else if (arch) {
                req.arch = arch;
                next();

            } else {
                console.log('record not found.' + err);
                res.status(404).send('Record was not found.');
            }
        });
    });

    function securityCheck(req, res){
        console.log('Check Users Credentials');
    }

    archRouter.route('/')
        .post( archController.post)
        .get( archController.get);

    archRouter.route('/:id'  )
        .get( securityCheck, archController.getById)
        .put( securityCheck, archController.put)
        .patch(securityCheck,  archController.patch)
        .delete(securityCheck,archController.remove) ;




























return archRouter;
};





module.exports=routes;
