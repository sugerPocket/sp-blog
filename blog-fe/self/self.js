'use strict';

angular.module('myApp').run(['$rootScope', ($rootScope) => {//初始化root
  $rootScope.contentExpanded = false;

  //////////事件监听
  $rootScope.$on('sideMenu:expand', () => $rootScope.contentExpanded = false);
  $rootScope.$on('sideMenu:shrink', () => $rootScope.contentExpanded = true);
}]);
