'use strict';

(function() {

  angular
    .module('myApp')
    .controller('sideMenuCtrl', sideMenuCtrl);

  sideMenuCtrl.$inject = ['$scope', '$state'];
  function sideMenuCtrl($scope, $state) {
    const vm = this;
    console.log($state);
    activate();

    ///////////////工具函数

    //////////////事件处理
    vm.goRegister = () => {
      console.log('call go resgister');
      $state.go('register');
    };

    //////////////资源

    //////////////初始化变量
    function initVariable() {

    }

    function activate() {
      
    }
  }
})();
