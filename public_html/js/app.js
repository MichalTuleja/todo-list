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

var store = new Store();


var SimpleListModel = function() {
    this.items = ko.observableArray();
    this.itemToAdd = ko.observable("");
    this.addItem = function() {
        if (this.itemToAdd() != "") {
            var newItem = {name: this.itemToAdd(), done: false};
            this.items.push(newItem); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
            store.add(newItem);
        }
    }.bind(this);  // Ensure that "this" is always this view model
    
    // Constructor
    var tmpdata = store.load();
    if(tmpdata.length > 0) {
        this.items(tmpdata);
    }
    else{
        var sampleData = [
            {name: "Pierwszy task", done: false},
            {name: "Drugi task", done: true},
            {name: "Trzeci task", done: false}
        ]
        
        for(var i=0; i<sampleData.length; i++) {
            this.items.push(sampleData[i]);
            store.add(sampleData[i]);
        }
    }
    
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
    
    var sampleList = [
        {name: "Pierwszy task", done: false}, 
        {name: "Drugi task", done: true},
        {name: "Trzeci task", done: false}
    ];
    
    ko.applyBindings(new SimpleListModel(sampleList));
});

