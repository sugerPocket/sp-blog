'use strict';

(function() {

  angular
    .module('sugerpocket')
    .controller('headerCtrl', headerCtrl);

  headerCtrl.$inject = ['$scope', '$rootScope', '$element', '$window'];

  function headerCtrl($scope, $rootScope, $element, $window) {
    const vm = this;

    activate();

    ///////////////工具函数
    function initScrollEvent() {
      if ($window.innerWidth < 767) vm.navTransparent = false;
      else vm.navTransparent = true;
      $window.onscroll = () => {
        let edge = 50;
        //if ($window.innerWidth < 1280) edge = 100;
        //if ($window.innerWidth < 767) edge = 0;
        if ($window.scrollY < edge) {
          if (!vm.navTransparent) {
            vm.navTransparent = true;
            $scope.$apply();
          }
        }
        else {
          if (vm.navTransparent) {
            vm.navTransparent = false;
            $scope.$apply();
          }
        }
      };
    }

    function handleLogin(data) {
      if (data.username && data.nickname) {
        vm.isLogin = true;
        vm.nickname = data.nickname;
      }
    }

    function handleLogout() {
      vm.isLogin = false;
      vm.nickname = '';
    }

    function removeScrollEvent() {
      vm.navTransparent = false;
      $window.onscroll = null;
    }

    //////////////事件处理
    vm.toggleSideMenu = ($event) => {
      vm.explanded = !vm.explanded;
      $rootScope.$broadcast('toggleSideMenu');
    };

    vm.openAuthModal = (name) => {
      $scope.$emit('auth:open', {
        name
      });
    };

    vm.logout = () => {
      vm.isLogin = false;
      vm.nickname = '';
      $scope.$emit('logout');
    };

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {
      vm.isLogin = false;
      vm.nickname = '';
      vm.explanded = true;
      vm.navTransparent = false;
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {}

    //////////////添加各种watch
    function initWatchEvent() {
      $rootScope.$on('removeHeaderScroll', removeScrollEvent);
      $rootScope.$on('addHeaderScroll', initScrollEvent);
      $rootScope.$on('login', ($event, data) => handleLogin(data));
      $rootScope.$on('logout', handleLogout);
    }

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }
  }
})();
