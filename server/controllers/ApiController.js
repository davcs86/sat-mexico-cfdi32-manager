'use strict';

const inherits = require('inherits'),
    BaseController = require('./BaseController');

function ApiController(model){
    BaseController.call(this, model);
}

inherits(ApiController, BaseController);

module.exports = ApiController;

ApiController.prototype.getAll = function(req, res){
    this.responseWrapper(this.model.findAndCountAll.call(this.model), res);
};

ApiController.prototype.getById = function(req, res){
    const id = req.params.id;
    this.responseWrapper(this.model.findById.call(this.model, id), res);
};

ApiController.prototype.create = function(req, res){
    this.responseWrapper(this.model.build.call(this.model, req.query).save(), res);
};

ApiController.prototype.update = function(req, res){
    const id = req.params.id;
    this.responseWrapper(this.model.findById.call(this.model, id)
        .then(function(item){
            return item.update(req.query);
        }), res);
};

ApiController.prototype.delete = function(req, res){
    const id = req.params.id;
    this.responseWrapper(this.model.findById.call(this.model, id)
        .then(function(item){
            return item.destroy();
        }), res);
};
