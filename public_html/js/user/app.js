var config = {
    serverUri: 'http://todolist'
};

var taskData = new DataStore();
 
var tasklist = new TaskListViewModel();
var navbar = new NavBarViewModel();
var loginForm = new LoginFormViewModel();
 
$(document).ready(function(){
    Router.initialize();
    Router.switchTo('list-container');
  
    ko.applyBindings(tasklist, document.getElementById('list-container'));
    ko.applyBindings(navbar, document.getElementById('navbar'));
    ko.applyBindings(loginForm, document.getElementById('signin-container'));
    
    navbar.userName('Michal Tuleja');
    navbar.isAdmin(false);
    navbar.isVisible(true);
});
