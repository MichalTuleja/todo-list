/* 
 */

var Store = function() {
    var data = new Array();
    
    this.add = function(obj) {
        data.push(obj);
        save();
    }
    
    var save = function() {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    
    this.load = function() {
        tmpdata = JSON.parse(localStorage.getItem('todolist'));
        
        if(tmpdata !=null) {
            data = tmpdata;    
        }
        
        return data;
    }
    
    this.sync = function() {
        return;
    }
}
