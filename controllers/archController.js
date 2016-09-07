var archController = function(Architecture){

  var post = function(req,res){
      var arch = new Architecture(req.body);
      if(!req.body.element){
          res.status(400);
          res.send('Field is required');
      }else {
          arch.save();
          res.status(201);
          res.send(arch);
      }
  };
    var get = function(req, res){
        var query=req.query;
         //pull  query string off of request

        Architecture.find( query, function(err, arch){
            if(err){
                console.log('Err finding architecture..' + err);
                res.status(500).send(err);
            }else{
                res.json(arch);
            }
        });
    };

    var getById = function(req,res){
        res.json(req.arch);
    };

    var put = function(req, res) {
        req.arch.element = req.body.element;
        req.arch.function = req.body.function;
        req.arch.framework = req.body.framework;
        req.arch.active = req.body.active;
        req.arch.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.arch);
            }
        });
    };
    var patch=function(req,res){
        //don't allow user to update id
        if (req.body._id){
            delete req.body._id;
        }
        //loop through updated fields
        for( var field in req.body){
            req.arch[field]= req.body[field];
        }
        req.arch.save( function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json( req.arch);
            }
        })
    };

    var remove =function(req,res){
        req.arch.remove(function(err){
            if(err){
                console.log('Cannot Remove Record: ' + err);
                res.status(500).send(err);
            }else{
                res.status(204).send('Record was removed.');
            }
        });

    };

     return{
            post: post,
            get:get,
            getById:getById,
            put:put,
            patch:patch,
            remove:remove
        }
};

module.exports = archController;