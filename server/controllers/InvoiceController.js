'use strict';

var inherits = require('inherits'),
    BaseController = require('./BaseController');

function InvoiceController(model){
    BaseController.call(this, model);
}

inherits(InvoiceController, BaseController);

module.exports = InvoiceController;
