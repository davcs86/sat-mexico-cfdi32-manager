var xml2js = require('xml2js'),
    fs = require('fs');

function FileReader(fileWriter) {
    this.fileWriter = fileWriter;
    this.parser = new xml2js.Parser();
    this.isWorking = false;
}

FileReader.$inject = [
    'fileWriter'
];

module.exports = FileReader;

FileReader.prototype.processFile = function (filePath) {
    if (!this.isWorking) {
        var self = this;
        var fileWriter = this.fileWriter;
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (!err) {
                self.parser.parseString(data, function (errParser, result) {
                    if (!errParser) {
                        fileWriter.writeInvoice(result);
                    }
                    self.isWorking = false;
                    self.parser.reset();
                });
            } else {
                self.isWorking = false;
            }
        });
    } else {
        throw new Error('Parser is working...');
    }
};
