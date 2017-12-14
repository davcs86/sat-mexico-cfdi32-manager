/*jslint nomen:true*/

'use strict';

var Sequelize = require('sequelize'),

    path = require('path'),
    _forIn = require('lodash/object').forIn;

function ApiBuilder(app) {
    this.app = app;
    this.config = {
        'invoice': {
            controller: require('./controllers/InvoiceController'),
            model: require('./models/InvoiceModel'),
        }
    };

    // create db
    this.db = new Sequelize('invoices', '1nvsf#n/gjs$rfg', '34$5dfgs#vdzvs3&4', {
        dialect: 'sqlite',
        storage: path.join(__dirname, './data/data.db')
    });
    // create controllers & their models
    this.buildControllers();
}

module.exports = ApiBuilder;

ApiBuilder.prototype.buildControllers = function(){
    var self = this;

    _forIn(this.config, function(m, mk){
        var model;
        if (m.model) {
            model = new m.model(self.db);
        }
        var controller;
        if (m.controller) {
            controller = new m.controller(model ? model.model: null);
            self.createRoutesForController.call(self, mk, controller);
        }

    });
};

ApiBuilder.prototype.createRoutesForController = function(controllerName, controllerInstance){
    this.app.get('/api/'+controllerName, controllerInstance.getAll.bind(controllerInstance));
    this.app.get('/api/'+controllerName+'/:id', controllerInstance.getById.bind(controllerInstance));
    this.app.post('/api/'+controllerName, controllerInstance.create.bind(controllerInstance));
    this.app.put('/api/'+controllerName+'/:id', controllerInstance.update.bind(controllerInstance));
    this.app.delete('/api/'+controllerName+'/:id', controllerInstance.delete.bind(controllerInstance));
};
