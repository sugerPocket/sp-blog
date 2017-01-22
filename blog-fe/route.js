'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.bootstrap', 'ui.router', 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'includes/home'
      }).
      state('addPost', {
        templateUrl: 'partials/addPost'
      }).
      state('/readPost/:id', {
        templateUrl: 'partials/readPost'
      }).
      state('/editPost/:id', {
        templateUrl: 'partials/editPost'
      }).
      state('/deletePost/:id', {
        templateUrl: 'partials/deletePost'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }]);
