'use strict';

(function() {

  angular
    .module('myApp')
    .controller('sp-side-menu', ctrlFn);

  ctrlFn.$inject = ['$rootScope', '$scope'];
  function ctrlFn($rootScope, $scope) {
    const vm = this;

    activate();

    ///////////////工具函数

    //////////////事件处理
    vm.toggleTelescopicState = () => {
      if (vm.expanded) $scope.$emit('sideMenu:shrink');
      else $scope.$emit('sideMenu:expand');
    };
    
    /////////////事件监听
    $scope.$on('sideMenu:expand', () => vm.expanded = true);
    $scope.$on('sideMenu:shrink', () => vm.expanded = false);

    //////////////资源

    //////////////初始化变量
    function initVariable() {
      vm.expanded = true;
    }

    function activate() {
      initVariable();
    }
  }
})();
