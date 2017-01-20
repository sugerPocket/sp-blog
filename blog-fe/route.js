'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.router', 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.
      state('home', {
        url: '/home',
        templateUrl: 'includes/home',
        controller: IndexCtrl
      }).
      state('addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      state('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      state('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      state('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      });
    $urlRouterProvider.otherwise('home');
    $locationProvider.html5Mode(true);
  }]);
