'use strict';

angular
  .module('sugerpocket.blog')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //配置一级路由
      $stateProvider
        .state('blog.list', {
          url: '/list',
          templateUrl: 'includes/blog.list'
        });
    }]);
