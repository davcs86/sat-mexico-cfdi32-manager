function QueueItem(item) {
    this.item = item;
    this.next = null;
}

function FileQueue(fileReader){
    this.head = null;
    this.fileReader = fileReader;
    var processFile = function () {
        var item = this.pop();
        if (item !== null) {
            //console.log('filequeue, set interval', item);
            try {
                this.fileReader.processFile(item);
            } catch (x) {
                this.push(item);
            }
            setTimeout(processFile, 600);
        } else {
            setTimeout(processFile, 4800);
        }

    }.bind(this);
    setTimeout(processFile, 600);
}

FileQueue.$inject = [
    'fileReader'
];

module.exports = FileQueue;

FileQueue.prototype.push = function(itemObj) {
    console.log('filequeue, push', itemObj);
    var item = new QueueItem(itemObj);
    if (this.head === null) {
        this.head = item;
        this.tail = this.head;
    } else {
        this.tail.next = item;
        this.tail = this.tail.next;
    }
};

FileQueue.prototype.pop = function(){
    if (this.head !== null){
        console.log('filequeue, pop', this.head);
        var item = this.head;
        this.head = this.head.next;
        return item.item;
    }
    return null;
};
