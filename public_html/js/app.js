var tabs = ['list-container', 'stats-container', 'signin-container', 'profile-container', 'userlist-container', 'useredit-container'];

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
	$('#show-userlist').parent().removeClass('active');
	$('#show-profile').parent().removeClass('active');
    $(activeElem).parent().addClass('active');
}

var store = new Store();


var SimpleListModel = function() {
    this.items = ko.observableArray();
    this.itemToAddTitle = ko.observable("");
	this.itemToAddDesc = ko.observable("");
    this.addItem = function() {
        if (this.itemToAddTitle() != "") {
			if(this.itemToAddDesc != "")
				var newItem = {title: this.itemToAddTitle(), description: this.itemToAddDesc(), done: false};
			else
				var newItem = {title: this.itemToAddTitle(), description: this.itemToAddTitle(), done: false};
            this.items.push(newItem); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAddTitle(""); // Clears the text box, because it's bound to the "itemToAdd" observable
			this.itemToAddDesc(""); // Clears the text box, because it's bound to the "itemToAdd" observable
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
            {title: "Pierwszy task", description: "opis taska 1", done: false}, 
			{title: "Drugi task", description: "opis taska 2", done: true},
			{title: "Trzeci task", description: "opis taska 3", done: false}
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
    
	$('#logo').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('list-container'); 
    });
	
	//TODO: remove
	$('#logo').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('useredit-container'); 
    });
	
    $('#show-stats').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('stats-container'); 
    });
    
	$('#show-signin').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('signin-container'); 
    });
	
	$('#show-profile').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('profile-container'); 
    });
	
	$('#show-userlist').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('userlist-container'); 
    });
    
    $('#show-tasks').click();
    
    var sampleList = [
        {title: "Pierwszy task", description: "opis taska 1", done: false}, 
        {title: "Drugi task", description: "opis taska 2", done: true},
        {title: "Trzeci task", description: "opis taska 3", done: false}
    ];
    
    ko.applyBindings(new SimpleListModel(sampleList));
});

// Contains case-insensitive
jQuery.expr[':'].Contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

// Task list filter
$('#task-list-filter').change( function () {
				var filter = $(this).val();
				if(filter) {
					$('#task-list').find("div.panel-default:not(:Contains(" + filter + "))").hide();
					$('#task-list').find("div.panel-default:Contains(" + filter + ")").show();
				} else {
					$('#task-list').find("div.panel-default").show();
				}
				
				return false;
			})
			.keyup( function () {
				$(this).change();
			});