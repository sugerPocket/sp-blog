'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', ['ngResource', 'ui.router', 'myApp.filters', 'myApp.services', 'myApp.directives']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'includes/home'
  }).state('register', {
    url: '/register',
    templateUrl: 'includes/register'
  });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}]);