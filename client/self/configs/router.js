'use strict';

angular
  .module('sugerpocket')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //配置一级路由
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'includes/home'
        })
        .state('blog', {
          url: '/blog',
          templateUrl: 'includes/blog'
        })
        .state('assignment', {
          url: '/assignment',
          templateUrl: 'includes/assignment'
        });

      $urlRouterProvider.otherwise('blog');
      $locationProvider.html5Mode(true);
    }]);
