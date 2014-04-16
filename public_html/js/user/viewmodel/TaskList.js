/* 
 */

var TaskListViewModel = function(sampleData) {
    
	this.items = ko.observableArray();
    this.itemToAddTitle = ko.observable("");
	this.itemToAddDesc = ko.observable("");
	var timeout = 10000;
	
    this.addItem = function() {
        if (this.itemToAddTitle() != "") {
			if(this.itemToAddDesc() != "")
				var newItem = {title: this.itemToAddTitle(), description: this.itemToAddDesc(), done: false};
			else
				var newItem = {title: this.itemToAddTitle(), description: this.itemToAddTitle(), done: false};
            this.items.push(newItem); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAddTitle(""); // Clears the text box, because it's bound to the "itemToAdd" observable
			this.itemToAddDesc(""); // Clears the text box, because it's bound to the "itemToAdd" observable
            tasks.add(newItem);
			this.items(tasks.load());
        }
    }.bind(this);  // Ensure that "this" is always this view model
    
	this.sync = function() {
		tasks.sync(function() {
			self.items(tasks.load());
		});
	}
	
    // Constructor
    var tmpdata = tasks.load();
    if(tmpdata.length > 0) {
        this.items(tmpdata);
    }
    else{
		for(var i=0; i<sampleData.length; i++) {
			this.items.push(sampleData[i]);
			tasks.add(sampleData[i]);
		}
	
    }
    
};
