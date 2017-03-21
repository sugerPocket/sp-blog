'use strict';

angular.module('sugerpocket')
  .run(['$rootScope', ($rootScope) => {//初始化root
    $rootScope.contentExpanded = true;

    //////////事件监听
    $rootScope.$on('toggleSideMenu', () => $rootScope.contentExpanded = !$rootScope.contentExpanded);
  }]);
