'use strict';

(function() {

  angular
    .module('sugerpocket')
    .controller('sideMenuCtrl', sideMenuCtrl);

  sideMenuCtrl.$inject = ['$scope', '$rootScope', '$state', 'sugerpocketRoute'];
  
  function sideMenuCtrl($scope, $rootScope, $state, sugerpocketRoute) {
    const vm = this;
    activate();

    ///////////////工具函数

    //////////////事件处理
    vm.goRegister = () => {
      console.log('call go resgister');
      $state.go('register');
    };

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {
      vm.expanded = false;
      vm.activeTab = 'blog';
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {
      vm.activeTab = sugerpocketRoute.getCurrent()[0];
    }

    //////////////添加各种watch
    function initWatchEvent() {
      $scope.$on('toggleSideMenu', () => {
        vm.expanded = !vm.expanded;
      });
      $rootScope.$on('$stateChangeSuccess', function () {
        vm.activeTab = sugerpocketRoute.getCurrent()[0];
      });
    }

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }
  }
})();
