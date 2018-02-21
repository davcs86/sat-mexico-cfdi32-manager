module.exports = {
    __init__: ['fileWatcher'],
    eventBus: ['type', require('eventemitter3')],
    fileWatcher: ['type', require('./fileWatcher')],
    fileReader: ['type', require('./fileReader')],
    fileQueue: ['type', require('./fileQueue')],
    fileWriter: ['type', require('./fileWriter')],
};
