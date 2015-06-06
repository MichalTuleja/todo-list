/* 
 */
'use strict';

//window.$ = window.jQuery = require('jquery');
var angular = require('angular');

require('angular-bootstrap-npm');

//var bootstrap = require('../common/libraries/vendor/bootstrap.min'); 

var todoApp = angular.module('todoApp', ['ui.bootstrap']);


todoApp.controller('TodoListCtrl', require('./controllers/appCtrl'));
