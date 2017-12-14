'use strict';

var inherits = require('inherits'),
    Sequelize = require('sequelize'),
    BaseModel = require('./BaseModel');

function InvoiceModel(database){
    BaseModel.call(this, database, 'invoice', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT
    });
}

inherits(InvoiceModel, BaseModel);

module.exports = InvoiceModel;

