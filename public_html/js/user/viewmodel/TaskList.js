/* 
 */

var TaskListViewModel = function() {
    var self = this;
    
	this.items = ko.observableArray(taskData.getData());
    
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
			this.items(taskData.getData());
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
	
    var onSyncStart = function() {
        self.status('Syncing...');
    }

    var onSyncFinish = function(result) {
        var statusText;
        
        if(result) {
            self.items(taskData.getData());
            statusText = 'Data refreshed.';
        }
        else {
            statusText = 'Could not refresh data.'
        }
        
        setTimeout(function(){
            self.status(statusText);
        }, 700);
    }
    
    Signals.data.syncStarted.add(onSyncStart);
    Signals.data.syncFinished.add(onSyncFinish);
    
    //Signals.data.forceSync.dispatch();
};
