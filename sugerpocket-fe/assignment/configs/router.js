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

      function goDefault($location) {
        $location.replace().path('/assignment/list');
      }

      $urlRouterProvider.when('/assignment', ['$location', goDefault]);
      $urlRouterProvider.when('/assignment/', ['$location', goDefault]);
    }]);
