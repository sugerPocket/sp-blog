'use strict';

(function() {

  angular
    .module('myApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$scope', '$resource'];
  function registerCtrl($scope, $resource) {
    const vm = this;

    activate();

    ///////////////工具函数

    //////////////事件处理

    //////////////资源
    function initResource() {
      vm.api.register = $resource('api/users/register');
    }

    //////////////初始化变量
    function initVariable() {
      vm.username = '';
      vm.password = '';
      vm.passwordCopy = '';
      vm.email = '';
      vm.nickname = '';
      vm.api = {};
    }

    function activate() {
      initVariable();
      initResource();
    }
  }
})();
