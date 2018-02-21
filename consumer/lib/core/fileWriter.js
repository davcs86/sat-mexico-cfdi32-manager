var csvWriter = require('csv-write-stream'),
    fs = require('fs');

function FileWriter(config){
    this.writer = csvWriter({ headers: ["Certificado", "Fecha", "RFC emisor", "Nombre emisor", "Subtotal", "IVA", "IEPS", "Total"]});
    this.writer.pipe(fs.createWriteStream(config.outputFile));
}

FileWriter.$inject = [
    'config'
];

module.exports = FileWriter;

FileWriter.prototype.writeInvoice = function(invoice){
    try {
        var cfdiInvoice = invoice['cfdi:Comprobante'],
            cfdiEmitter = cfdiInvoice['cfdi:Emisor'],
            cfdiTaxes = cfdiInvoice['cfdi:Impuestos'][0]['cfdi:Traslados'],
            cfdiNumber = cfdiInvoice.$.noCertificado,
            cfdiDate = cfdiInvoice.$.fecha,
            cfdiEmitterId = cfdiEmitter[0].$.rfc,
            cfdiEmitterName = cfdiEmitter[0].$.nombre,
            cfdiSubtotal = cfdiInvoice.$.subTotal,
            cfdiTotal = cfdiInvoice.$.total,
            cfdiIVA = 0,
            cfdiIEPS = 0
        ;

        for (var i in cfdiTaxes) {
            var taxDetails = cfdiTaxes[i]['cfdi:Traslado'][0].$;
            switch (taxDetails.impuesto) {
                case 'IVA':
                    cfdiIVA = taxDetails.importe;
                    break;
                case 'IEPS':
                    cfdiIEPS = taxDetails.importe;
                    break;
            }

            console.log(taxDetails.impuesto);
        }

        this.writer.write({
            "Certificado": cfdiNumber,
            "Fecha": cfdiDate,
            "RFC emisor": cfdiEmitterId,
            "Nombre emisor": cfdiEmitterName,
            "Subtotal": cfdiSubtotal,
            "IVA": cfdiIVA,
            "IEPS": cfdiIEPS,
            "Total": cfdiTotal
        });
    } catch (ex) {
        console.log(ex);
    }
};
