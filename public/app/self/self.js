'use strict';

angular.module('sugerpocket').run(['$rootScope', function ($rootScope) {
  //初始化root
  $rootScope.contentExpanded = true;

  //////////事件监听
  $rootScope.$on('toggleSideMenu', function () {
    return $rootScope.contentExpanded = !$rootScope.contentExpanded;
  });
}]);