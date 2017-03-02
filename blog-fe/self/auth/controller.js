'use strict';

(function() {

  angular
    .module('sugerpocket')
    .controller('authCtrl', authCtrl);

  authCtrl.$inject = ['$scope', '$resource', '$stateParams', '$rootScope'];

  function authCtrl($scope, $resource, $stateParams, $rootScope) {
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

      let error = (err) => {
        console.log(err);
      };

      let promise = vm.api.login.save(data).$promise;
      promise
        .then((result) => {
          if (result.status === 'OK') success(result);
          else console.log(result);
        })
        .catch((err) => {
          error(err);
        });
      
    }

    function registerOneUsr() {
      let username = vm.username;
      let password = vm.password;
      let email = vm.email;
      let nickname = vm.nickname;
      let data = {
        username,
        password,
        nickname,
        email
      };

      let success = (result) => {
        console.log(result);
      };

      let error = (err) => {
        console.log(err);
      };

      let promise = vm.api.register.save(data).$promise;

      promise
        .then((result) => {
          if (result.status === 'OK') success(result);
          else console.log(result);
        })
        .catch((err) => {
          error(err);
        });

    }

    function reset() {
      vm.username = '';
      vm.password = '';
      vm.email = '';
      vm.nickname = '';
    }

    function toggleTab(name) {
      let tabArr = ['login', 'register'];
      if (tabArr.indexOf(name) !== -1) {
        reset();
        if (name !== vm.activeTab) vm.activeTab = name;
      }
    }

    function openAuthModal(name) {
      reset();
      toggleTab(name);
    }

    //////////////事件处理
    vm.login = () => loginOneUser();
    vm.register = () => registerOneUsr();
    vm.reset = () => reset();
    vm.toggleTab = (name) => toggleTab(name);

    //////////////资源
    function initResource() {
      vm.api = {};
      vm.api.login = $resource('/auth/login');
      vm.api.register = $resource('/auth/register');
    }
    //////////////初始化变量
    function initVariable() {
      vm.username = '';
      vm.password = '';
      vm.nickname = '';
      vm.activeTab = 'register';
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {
      
    }

    //////////////添加各种watch
    function initWatchEvent() {
      $rootScope.$on('auth:open', function ($event, params) {
        openAuthModal(params.name);
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
