'use strict';

(function() {

  angular
    .module('myApp')
    .controller('logInCtrl', logInCtrl);

  logInCtrl.$inject = ['$scope', '$resource'];
  function logInCtrl($scope, $resource) {
    const vm = this;

    activate();

    ///////////////工具函数
    function loginOneUser() {
      let username = vm.username;
      let password = vm.password;
      let data = {
        username,
        password
      };
      let success = (result) => {
        console.log(result);
      };

      vm.api.login.save(data, (result) => {
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
      vm.api.login = $resource('/api/users/login');
    }
    //////////////初始化变量
    function initVariable() {
      vm.username = '';
      vm.password = '';
    }

    function activate() {
      initVariable();
      initResource();
    }
  }
})();
