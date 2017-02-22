'use strict';

angular
  .module('sugerpocket.assignment')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //配置一级路由
      $stateProvider
        .state('assignment.list', {
          url: '/list',
          templateUrl: 'includes/assignment.list'
        });
    }]);
