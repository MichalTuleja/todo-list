/* 
 */

var DataStore = function() {
    var data = new Array();
    var serverUri = 'http://tododev.demo.intelifusion.net';
    
    this.add = function(obj) {
        data.push(obj);
        save();
    }
    
    var save = function() {
        store.set('todolist', data);
        
        /*
        requestUri = serverUri + '/rest/list';
        
        $.ajax({
            type: "PUT",
            url: requestUri,
            data: { name: "John", location: "Boston" }
        }).done(function( result ) {
            console.log( "Data uploaded correctly" );
        }).fail(function(){
            console.log('Couldn\'t save data');
        }); */
    }
    
    this.load = function() {
        tmpdata = store.get('todolist');
        
        if(tmpdata !=null) {
            data = tmpdata;    
        }
        
        return data;
    }
    
    this.sync = function(callback) {
        requestUri = serverUri + '/rest/list';
        
        $.ajax({
            type: "GET",
            url: requestUri,
            dataType: 'jsonp',
            contentType: 'application/json'
        }).done(function( jsonData ) {
            var dataToParse = jsonData.list;
            data = new Array();
            for(i=0; i<dataToParse.length; i++) {
                data.push({name: dataToParse[i].name, done: dataToParse[i].status});
            }
            save();
            callback();
        }).fail(function(){
            debugger;
            console.log('Couldn\'t fetch data');
        });
    }
}
