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
        })
        .state('assignment.new', {
          url: '/new',
          templateUrl: 'includes/assignment.new'
        })
        .state('assignment.one', {
          url: '/:assignmentId',
          templateUrl: 'includes/assignment.one'
        });

      function goDefault($state) {
        $state.go('assignment.list');
      }

      $urlRouterProvider.when('/assignment', ['$state', goDefault]);
      $urlRouterProvider.when('/assignment/', ['$state', goDefault]);
    }]);
