var config = {
    serverUri: 'http://localhost'
};

var sampleData = [
    {title: "Pierwszy task", description: "opis taska 1", done: false}, 
    {title: "Drugi task", description: "opis taska 2", done: true},
    {title: "Trzeci task", description: "opis taska 3", done: false}
];

var tasks = new DataStore();
 
$(document).ready(function(){
    Router.initialize();
    Router.switchTo('list-container');
  
    // View-model binding
    // Task list
    ko.applyBindings(new TaskListViewModel(sampleData));
});

// Contains case-insensitive
jQuery.expr[':'].Contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

// Task list filter
$('#task-list-filter').change( function () {
				var filter = $(this).val();
				if(filter) {
					$('#task-list').find("tbody:not(:Contains(" + filter + "))").hide();
					$('#task-list').find("tbody:Contains(" + filter + ")").show();
				} else {
					$('#task-list').find("tbody").show();
				}
				
				return false;
			})
			.keyup( function () {
				$(this).change();
			});