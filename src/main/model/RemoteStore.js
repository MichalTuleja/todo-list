/* 
 */

var RemoteSync = function() {
    var self = this;

    this.data = new Array();
    var serverUri = config.serverUri;
    var getAllUri = serverUri + '/rest/list';
    var syncUri = serverUri + '/rest/sync';

    var allowedData = ['id', 'ctime', 'mtime', 'deleted', 'name', 'status', 'description', 'local_mtime'];
    var requiredData = ['id', 'ctime', 'mtime', 'deleted', 'name', 'status', 'description'];
    

    this.getData = function() {
        return self.data;
    };
    
    this.update = function(currentData) {
        self.data = currentData;
        save();
    }

    this.add = function(obj) {
        if(self.data === null) {
            self.data = new Array();
        }
        
        self.data.push(validate(obj));
        save();
    };

    var save = function() {
        store.set('todolist', self.data);
    };

    var load = function() {
        var tmpdata = store.get('todolist');

        if (tmpdata != null) {
            self.data = tmpdata;
        }
        else {
            Signals.data.forceReload.dispatch();
        }
    };

    var validate = function(obj) {
        var validateEntry = function(entry) {
            for (var i = 0; i < requiredData.length; i++) {
                fieldName = requiredData[i];

                if (typeof entry[fieldName] === 'undefined') {
                    entry[fieldName] = null;
                }
                else {
                    if (fieldName === 'status') {
                        if (entry[fieldName] === '1') {
                            entry[fieldName] = true;
                        }
                        else {
                            entry[fieldName] = false;
                        }
                    }

                    if (fieldName === 'deleted') {
                        if (entry[fieldName] === '1') {
                            entry[fieldName] = true;
                        }
                        else {
                            entry[fieldName] = false;
                        }
                    }
                }
            }
            
            entry.local_mtime = new Date();

            return entry;
        }

        var validateArray = function(array) {
            for (var i = 0; i < array.length; i++) {
                array[i] = validateEntry(array[i]);
            }

            return array;
        }

        if (obj.length === undefined) {
            return validateEntry(obj);
        }
        else if (obj.length > 0) {
            return validateArray(obj);
        }
        else {
            return null;
        }
    }

    var isValid = function(entry) {
        for (var i = 0; i < requiredData.length; i++) {
            fieldName = requiredData[i];

            if (typeof entry[fieldName] === 'undefined') {
                return false;
            }
        }

        return true;
    }

    this.reloadAll = function() {
        var mergeWithLocal = function(serverData) {
            self.data = validate(serverData);
        };

        //var requestUri = "/fixtures/tasks.json";
        var requestUri = getAllUri;

        Signals.data.syncStarted.dispatch();

        $.ajax({
            type: "GET",
            url: requestUri,
            dataType: 'jsonp',
            contentType: 'application/json; charset=UTF-8'
        }).done(function(result) {
            var serverData = parseData(result);
            mergeWithLocal(serverData);
            save();
            console.log("Data synced");
            Signals.data.syncFinished.dispatch(true);
        }).fail(function() {
            console.log('Couldn\'t get data');
            Signals.data.syncFinished.dispatch(false);
        });
    };


    this.sync2 = function() {
        var mergeWithLocal = function(serverData) {
            self.data = validate(serverData);
        }

        // Deprecated: rozw konfliktów jest po stronie serwera
        var resolveConfilct = function(local, remote) {
            var dataToSync = requiredData;
            self.data.splice(dataToSync.indexOf('id'), 1);
            self.data.splice(dataToSync.indexOf('mtime'), 1);

            if (remote.mtime !== local.mtime) {
                for (var i = 0; i < dataToSync.length; i++) {
                    var param = dataToSync[i];
                    local[param] = remote[param];
                }
            }

            return local;
        };


        //var requestUri = "/fixtures/sync.json";
        var requestUri = syncUri;

        Signals.data.syncStarted.dispatch();

        $.ajax({
            type: "POST",
            url: requestUri,
            dataType: 'jsonp',
            data: JSON.stringify(validate(self.data)),
            contentType: 'application/json; charset=UTF-8'
        }).done(function(result) {
            var serverData = parseData(result);
            mergeWithLocal(serverData);
            save();
            console.log("Data synced");
            Signals.data.syncFinished.dispatch(true);
        }).fail(function(result) {
            console.log('Couldn\'t get data');
            Signals.data.syncFinished.dispatch(false);
        });
    };

    var parseData = function(data) {
        for (var i = 0; i < data.length; i++) {
            if (!isValid(data[i])) {
                data.splice(i, 1);
            }
        }

        return data;
    };

    Signals.data.forceSync.add(this.sync2);
    Signals.data.forceReload.add(this.reloadAll);
    
    load();
};
