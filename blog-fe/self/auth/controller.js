'use strict';

(function() {

  angular
    .module('sugerpocket')
    .controller('authCtrl', authCtrl);

  authCtrl.$inject = ['$scope', '$resource', '$stateParams'];

  function authCtrl($scope, $resource, $stateParams) {
    const vm = this;

    activate();

    ///////////////工具函数
    function logInOneUser() {
      let username = vm.username;
      let password = vm.password;
      let data = {
        username,
        password
      };
      let success = (result) => {
        console.log(result);
      };

      vm.api.logIn.save(data, (result) => {
        if (result.status === 'OK') success(result);
        else console.log(result);
      });
    }

    function reset() {
      vm.username = '';
      vm.password = '';
    }

    //////////////事件处理
    vm.login = () => loginOneUser();
    vm.reset = () => reset();

    //////////////资源
    function initResource() {
      vm.api = {};
      vm.api.logIn = $resource('/api/users/logIn');
      vm.api.register = $resource('/api/users/register');
    }
    //////////////初始化变量
    function initVariable() {
      vm.username = '';
      vm.password = '';
      vm.activeTab = 'register';
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {
      if ($stateParams.action !== 'register' && $stateParams.action !== 'logIn') {
        throw new Error('$state params error!(action is neither "register" nor "logIn")');
        return;
      }

      vm.activeTab = $stateParams.action;
    }

    //////////////添加各种watch
    function initWatchEvent() {}

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }
  }
})();
