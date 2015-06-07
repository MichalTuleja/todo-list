/* TODO HTML5 Offline App
 * 
 * Author: Michal Tuleja <michal.tuleja@outlook.com>
 */

'use strict';

// Include libraries
var angular = require('angular');
require('angular-bootstrap-npm');
require('angular-storage');

// Initialize app
var todoApp = angular.module('todoApp', ['ui.bootstrap', 'angular-storage']);

// Initialize controllers
todoApp.controller('TodoListCtrl', require('./controllers/appCtrl'));
