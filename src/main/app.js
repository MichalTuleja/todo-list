/* 
 */
'use strict';

window.$ = window.jQuery = require('jquery');
var bootstrap = require('../common/libraries/vendor/bootstrap.min');
var ko = require('../common/libraries/vendor/knockout-3.1.0');


//var taskData = new LocalStore();
 
var tasklist = new TaskListViewModel();
var navbar = new NavBarViewModel();
var loginForm = new LoginFormViewModel();
 
$(document).ready(function(){
    Router.initialize();
    Router.switchTo('list-container');
  
    ko.applyBindings(tasklist, document.getElementById('list-container'));
    ko.applyBindings(navbar, document.getElementById('navbar'));
    ko.applyBindings(loginForm, document.getElementById('signin-container'));
    
    navbar.userName('User1');
    navbar.isVisible(true);
});