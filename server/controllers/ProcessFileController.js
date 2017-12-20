'use strict';

const inherits = require('inherits'),
    BaseController = require('./BaseController');

function ProcessFileController(app, model){
    BaseController.call(this, model);
    this.app = app;
    // routes

}

inherits(ProcessFileController, BaseController);

module.exports = ProcessFileController;

