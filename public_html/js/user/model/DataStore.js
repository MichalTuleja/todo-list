/* 
 */

var DataStore = function() {
    var self = this;

    var data = new Array();
    var serverUri = config.serverUri;
    var getAllUri = serverUri + '/rest/list';
    var syncUri = serverUri + '/rest/sync';

    var requiredData = ['id', 'ctime', 'mtime', 'deleted', 'name', 'status', 'description'];


    this.getData = function() {
        return data;
    };
    
    this.update = function(currentData) {
        data = currentData;
        save();
    }

    this.pushData = function() {
        
    };

    this.add = function(obj) {
        data.push(obj);
        save();
    };

    var save = function() {
        store.set('todolist', data);
    };

    var load = function() {
        tmpdata = store.get('todolist');

        if (tmpdata != null) {
            data = tmpdata;
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
            data = validate(serverData);
        };

        var requestUri = "/fixtures/tasks.json";

        Signals.data.syncStarted.dispatch();

        $.ajax({
            type: "GET",
            url: requestUri
                    //dataType: 'jsonp'
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
            data = validate(serverData);
        }

        // Deprecated: rozw konfliktów jest po stronie serwera
        var resolveConfilct = function(local, remote) {
            var dataToSync = requiredData;
            data.splice(dataToSync.indexOf('id'), 1);
            data.splice(dataToSync.indexOf('mtime'), 1);

            if (remote.mtime !== local.mtime) {
                for (var i = 0; i < dataToSync.length; i++) {
                    var param = dataToSync[i];
                    local[param] = remote[param];
                }
            }

            return local;
        }


        var requestUri = "/fixtures/sync.json";

        Signals.data.syncStarted.dispatch();

        $.ajax({
            type: "GET",
            url: requestUri,
                    dataType: 'jsonp'
                    //data: validate(data)
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
    }

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
}
