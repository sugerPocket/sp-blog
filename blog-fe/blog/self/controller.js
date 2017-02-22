'use strict';

(function() {
  angular
    .module('sugerpocket.blog')
    .controller('blogCtrl', blogCtrl);
  
  blogCtrl.$inject = ['$scope', '$state'];
  function blogCtrl($scope, $state) {
    const vm = this;

    activate();

    ///////////////工具函数

    //////////////事件处理

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {}

    //////////////使用参数初始化变量
    function initParamsVariable() {}

    //////////////添加各种watch
    function initWatchEvent() {
      $scope.$emit('addHeaderScroll');
      $scope.$on('$destroy', function() {
        $scope.$emit('removeHeaderScroll');
      });
    }

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }

    $state.go('blog.list');
  }
})();
