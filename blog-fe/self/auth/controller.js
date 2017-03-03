'use strict';

(function() {

  angular
    .module('sugerpocket')
    .controller('authCtrl', authCtrl);

  authCtrl.$inject = ['$scope', '$resource', '$stateParams', '$rootScope', 'Notification', '$element', '$state'];

  function authCtrl($scope, $resource, $stateParams, $rootScope, Notification, $element, $state) {
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
        reset();
        $($element[0]).modal('hide');
        Notification.success('Welcome ' + result.userMeta.nickname);
        $scope.$emit('login', result.userMeta);
      };

      let error = (err) => {
        reset();
        Notification.error(err.msg);
      };

      let promise = vm.api.login.save(data).$promise;
      promise
        .then((result) => {
          if (result.status === 'OK') success(result);
          else error(result);
        })
        .catch((err) => {
          Notification.error(err);
          $state.go('blog.list');
        });
      
    }

    function registerOneUsr() {
      let username = vm.username;
      let password = vm.password;
      let email = vm.email;
      let nickname = vm.nickname;
      let identifyingCode = vm.identifyingCode;
      let data = {
        username,
        password,
        nickname,
        email,
        identifyingCode
      };

      let success = (result) => {
        $($element[0]).modal('hide');
        Notification.success('Welcome ' + result.userMeta.nickname);
        reset();
        $scope.$emit('login', result.userMeta);
      };

      let error = (err) => {
        Notification.error(err.msg);
      };

      let promise = vm.api.register.save(data).$promise;

      promise
        .then((result) => {
          if (result.status === 'OK') success(result);
          else error(result);
        })
        .catch((err) => {
          Notification.error(err);
          $state.go('blog.list');
        });

    }

    function initAuthState() {
      let data = {};

      let success = (result) => {
        $scope.$emit('login', result.userMeta);
        Notification.success('Welcome ' + result.userMeta.nickname);
      };

      let error = (err) => {
        if (err.msg) Notification.error(err.msg);
      };

      let promise = vm.api.init.save(data).$promise;

      promise
        .then(result => {
          if (result.status === 'OK') success(result);
          else error(result);
        })
        .catch(err => {
          Notification.error(err);
        });
    }

    function reset() {
      vm.username = '';
      vm.password = '';
      vm.email = '';
      vm.nickname = '';
      vm.identifyingCode = '';
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
      vm.api.init = $resource('/auth/init');
      vm.api.login = $resource('/auth/login');
      vm.api.register = $resource('/auth/register');
    }
    //////////////初始化变量
    function initVariable() {
      vm.username = '';
      vm.password = '';
      vm.nickname = '';
      vm.email = '';
      vm.identifyingCode = '';
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

    //////////////初始化Dom
    function initDom() {
      initAuthState();
    }

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
      initDom();
    }
  }
})();
