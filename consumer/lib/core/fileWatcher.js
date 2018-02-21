var chokidar = require('chokidar');

function FileWatcher(config, fileQueue){
    console.log('fileWatcher', config);
    chokidar.watch(config.inputDir, {ignored: /(^|[\/\\])\../}).on('add', function(path) {
        console.log(path);
        fileQueue.push(path);
    });
}

FileWatcher.$inject = [
    'config',
    'fileQueue'
];

module.exports = FileWatcher;

