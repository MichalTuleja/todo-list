/* 
 */

var TaskListViewModel = function() {
    var self = this;
    
	this.items = ko.observableArray();
    
    this.itemToAddTitle = ko.observable("");
    this.status = ko.observable("Data loaded from cache.");
	
    this.addItem = function() {
        if (this.itemToAddTitle() != "") {
            var newItem = {
                name: this.itemToAddTitle(),
                description: this.itemToAddTitle(),
                status: false
            };
            
            //this.items.push(newItem); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAddTitle(""); // Clears the text box, because it's bound to the "itemToAdd" observable
            taskData.add(newItem);
			getFromLocal();
        }
    }.bind(this);  // Ensure that "this" is always this view model
    
    this.onChange = function() {
        setTimeout(function(){
            taskData.update(self.items());
        }, 50);
    };
    
	this.forceSync = function() {
        Signals.data.forceSync.dispatch();
	}
	
    this.sortItems = function() {
        var byMtime = function(a,b) {
            var a_time = new Date((a.mtime != null && a.mtime != '') ? a.mtime : a.local_mtime);
            var b_time = new Date((b.mtime != null && a.mtime != '') ? b.mtime : b.local_mtime);
            
            if (a_time < b_time)
                return 1;
            if (a_time > b_time)
                return -1;
            return 0;
        };
        
        this.items.sort(byMtime);
    };
    
    var getFromLocal = function() {
        self.items(taskData.getData());
        self.sortItems();
    }
    
    var onSyncStart = function() {
        self.status('Syncing...');
        navbar.setStatusIcon('refresh');
    }

    var onSyncFinish = function(result) {
        var statusText;
        
        if(result) {
            self.items(taskData.getData());
            self.sortItems();
            statusText = 'Data refreshed.';
            navbar.setStatusIcon('cloud');
        }
        else {
            statusText = 'Could not refresh data.'
            navbar.setStatusIcon('error');
        }
        
        setTimeout(function(){
            self.status(statusText);
        }, 700);
    }
    
    Signals.data.syncStarted.add(onSyncStart);
    Signals.data.syncFinished.add(onSyncFinish);
    
    getFromLocal();
    //Signals.data.forceSync.dispatch();
};
