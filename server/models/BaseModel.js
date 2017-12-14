'use strict';

function BaseModel(database, modelName, modelOptions){
    this.model = database.define(modelName, modelOptions);
    this.model.sync();
}

module.exports = BaseModel;
