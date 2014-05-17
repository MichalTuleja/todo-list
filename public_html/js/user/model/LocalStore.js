/* 
 */

var LocalStore = function() {
    var self = this;

    var localData = new Array();

    this.getData = function() {
        var dataToReturn = [];
        
        if (localData != null) {
            for(var i=0; i<localData.length; i++) {
                dataToReturn.push(localData[i].getObject());
            }
        }
        
        return dataToReturn;
    };
    
    this.update = function(currentData) {
        var tmpdata = [];
        
        if (currentData != null) {
            for(var i=0; i<currentData.length; i++) {
                var task = new Task(tmpdata[i]);
                tmpdata.push(task);
            }
        }
        
        localData = tmpdata;
        save();
    };

    this.add = function(obj) {
        if(localData === null) {
            localData = new Array();
        }
        
        localData.push(new Task(obj));
        save();
    };

    var save = function() {
        store.set('todolist', self.getData());
    };

    var load = function() {
        var tmpdata = store.get('todolist');
        
        if (tmpdata != null) {
            for(var i=0; i<tmpdata.length; i++) {
                var task = new Task(tmpdata[i]);
                localData.push(task);
            }
        }
        else {
            Signals.data.forceReload.dispatch();
        }
    };
    
    load();
};
