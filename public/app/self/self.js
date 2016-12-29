'use strict';

angular.module('myApp').run(['$rootScope', function ($rootScope) {
  //初始化root
  $rootScope.contentExpanded = false;

  //////////事件监听
  $rootScope.$on('sideMenu:expand', function () {
    return $rootScope.contentExpanded = false;
  });
  $rootScope.$on('sideMenu:shrink', function () {
    return $rootScope.contentExpanded = true;
  });
}]);