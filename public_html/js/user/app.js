var config = {
    serverUri: 'http://localhost'
};

var sampleData = [
    {title: "Pierwszy task", description: "opis taska 1", done: false}, 
    {title: "Drugi task", description: "opis taska 2", done: true},
    {title: "Trzeci task", description: "opis taska 3", done: false}
];

var tasks = new DataStore();
 
var tasklist = new TaskListViewModel(sampleData);
var navbar = new NavBarViewModel();
var loginForm = new LoginFormViewModel();
 
$(document).ready(function(){
    Router.initialize();
    Router.switchTo('list-container');
  
    ko.applyBindings(tasklist, document.getElementById('list-container'));
    ko.applyBindings(navbar, document.getElementById('navbar'));
    ko.applyBindings(loginForm, document.getElementById('signin-container'));
    
    navbar.userName('Michal Tuleja');
    navbar.isAdmin(true);
    navbar.isVisible(true);
});
