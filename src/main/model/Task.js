/* 
 */

var Task = function(initObj) {
    var self = this;
    
    var taskObj = {
        id: null,
        name: null,
        description: null,
        status: null,
        deleted: null,
        local_mtime: null,
        mtime: null,
        ctime: null
    };
    
    this.getObject = function() {
        return taskObj;
    };
    
    this.setObject = function(object) {
        for(data in taskObj) {
            if(object[data] != null) {
                taskObj[data] = object[data];
            }
            else {
                switch(data) {
                    case 'local_mtime':
                        taskObj[data] = new Date().toJSON();
                        break;
                    default:
                        taskObj[data] = '';
                }
                
            }
        }
    };
    
    if(initObj != null) {
        this.setObject(initObj);
    };
};
