var tabs = ['list-container', 'stats-container'];

var hideAll = function() {
    for(var i = 0; i < tabs.length; i++) {
        $('#' + tabs[i]).hide();
    }
}

var switchTo = function(tabName) {
    hideAll();
    $('#' + tabName).show();
}

var removeClassActiveForAllAndPrepareView = function(activeElem) {
    $('#show-stats').parent().removeClass('active');
    $('#show-tasks').parent().removeClass('active');
    $(activeElem).parent().addClass('active');
}

var tasks = new DataStore();


var SimpleListModel = function(sampleData) {
    self = this;
    
    this.items = ko.observableArray();
    this.itemToAdd = ko.observable("");
    
    var timeout = 10000;
    
    this.addItem = function() {
        if (this.itemToAdd() != "") {
            var newItem = {name: this.itemToAdd(), done: false};
            //this.items.push(newItem); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
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

    setInterval(function(){
        console.log('Syncing...');
        self.sync();
    }, timeout);
};
 
$(document).ready(function(){
    $('#show-tasks').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('list-container'); 
    });
    
    $('#show-stats').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('stats-container'); 
    });
    //$('#show-container').click(function() { switchTo('login'); });
    
    $('#show-tasks').click();
    
    var sampleData = [
        {name: "Pierwszy task", done: false}, 
        {name: "Drugi task", done: true},
        {name: "Trzeci task", done: false}
    ];
    
    ko.applyBindings(new SimpleListModel(sampleData));
});

