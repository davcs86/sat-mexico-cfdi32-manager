'use strict';

function BaseController(model){
    this.model = model;
}

module.exports = BaseController;

BaseController.prototype.responseWrapper = function (promise, res) {
    promise
        .then(function (data) {
            res.status(200).send(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};



