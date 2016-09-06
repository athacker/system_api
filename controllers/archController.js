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
        var query={};

        if(req.query.function){
            query.function= req.query.function ;
        }

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


    return{
        post: post,
        get:get,
        getById:getById
    }
}

module.exports = archController;