'use strict';

function BaseController(model){
    this.model = model;
}

module.exports = BaseController;

var responseWrapper = function (promise, res) {
    promise
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

BaseController.prototype.getAll = function(req, res){
    responseWrapper(this.model.findAndCountAll.call(this.model), res);
};

BaseController.prototype.getById = function(req, res){
    var id = req.params.id;
    responseWrapper(this.model.findById.call(this.model, id), res);
};

BaseController.prototype.create = function(req, res){
    responseWrapper(this.model.build.call(this.model, req.query).save(), res);
};

BaseController.prototype.update = function(req, res){
    var id = req.params.id;
    responseWrapper(this.model.findById.call(this.model, id)
        .then(function(item){
            return item.update(req.query);
        }), res);
};

BaseController.prototype.delete = function(req, res){
    var id = req.params.id;
    responseWrapper(this.model.findById.call(this.model, id)
        .then(function(item){
            return item.destroy();
        }), res);
};


