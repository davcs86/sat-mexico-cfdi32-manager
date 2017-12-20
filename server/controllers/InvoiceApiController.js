'use strict';

const inherits = require('inherits'),
    ApiController = require('./ApiController');

function InvoiceController(model){
    ApiController.call(this, model);
}

inherits(InvoiceController, ApiController);

module.exports = InvoiceController;
