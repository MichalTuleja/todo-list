/* 
 */

var DataStore = function() {
    var data = new Array();
    var serverUri = config.serverUri;
    var requestUri = serverUri + '/rest/list';
    
    this.add = function(obj) {
        data.push(obj);
        save();
    }
    
    var save = function() {
        store.set('todolist', data);
    }
    
    this.load = function() {
        tmpdata = store.get('todolist');
        
        if(tmpdata !=null) {
            data = tmpdata;    
        }
        
        return data;
    }

    /* Funkcja synchronizująca dane
     *  - uploaduje nowe taski 
     *  - pobiera wszytskie z serwera
     *  - sprawdza czy coś się nie zmieniło
     *  - jak id są takie same a serwer ma nowszy to merge
     *  - jak klient ma nowszy to robi updatre (POST) z określonym id do serwera
     *  
     *  - TODO na przyszłość (performance): jak jest kilka tasków do update'u,
     *    to wygenerować jeden mega-request updateujący
     *    
     *  - Alternatywnie: pchać wszystkie dane POSTem i rozwiązywać konflikty
     *    po stronie serwera
     */
    this.sync = function(callback) {

        for(var i=0; i<data.lenght; i++) {
            var entry = data[i];
            if(typeof entry.id == 'undefined' || entry.id == null) {
                // put data
                $.ajax({
                    type: "PUT",
                    url: requestUri,
                    dataType: 'jsonp',
                    data: validate(entry)
                }).done(function( result ) {
                    entry.id = result.id;
                    console.log( "Data uploaded correctly" );
                }).fail(function(){
                    console.log('Couldn\'t save data');
                });                
            }            
        }

        $.ajax({
            type: "GET",
            url: requestUri,
            dataType: 'jsonp',
            contentType: 'application/json'
        }).done(function( jsonData ) {
            var dataToParse = jsonData.list;
            data = new Array();
            for(var i=0; i<dataToParse.length; i++) {
                remoteEntry = validate(dataToParse[i]);
                mergeFlag = false;

                for(var j=0; j<data.length; j++) {
                    localEntry = validate(data[j]);
                    if(localEntry.id == remoteEntry.id) {
                        mergeData(localEntry, remoteEntry);
                        mergeFlag = true;
                    }
                }
                
                if(!mergeFlag) {
                    data.push({id: dataToParse[i].id,
                               ctime: dataToParse[i].ctime,
                               mtime: dataToParse[i].mtime,
                               deleted: dataToParse[i].deleted,
                               name: dataToParse[i].name, 
                               done: dataToParse[i].status});
                }
            }
            save();
            callback();
        }).fail(function(){
            debugger;
            console.log('Couldn\'t fetch data');
        });
    };
    
    var mergeData = function(local, remote) {
        var dataToSync = ['deleted', 'name', 'status', 'description'];
        
        if(local.mtime > remote.mtime) {
            update(local);
        }
        else {
            if(local.mtime != remote.mtime) {
                for(var i=0; i<dataToSync.length; i++) {
                    var param = dataToSync[i];
                    local[param] = remote[param];
                }
            }
        }        
    }
    
    var update = function(entry) {
        $.ajax({
            type: "POST",
            url: requestUri,
            dataType: 'jsonp',
            data: validate(entry)
        }).done(function( result ) {
            console.log( "Data updated correctly" );
        }).fail(function(){
            console.log('Couldn\'t save data');
        });   
    }
    
    var validate = function(entry) {
        var requiredData = ['id', 'ctime', 'mtime', 'deleted', 'name', 'status', 'description'];
        
        for(var i=0; i<requiredData.length; i++) {
            fieldName = requiredData[i];
            
            if(typeof entry[fieldName] === 'undefined') {
                entry[fieldname] = null;
            }
        }
        
        return entry;

    }
}
