'use strict';

(function() {

  angular
    .module('myApp')
    .controller('Ctrl', Ctrl);

  Ctrl.$inject = ['$scope'];

  function Ctrl($scope) {
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
    function initWatchEvent() {}

    /////////////初始化Dom
    function initDom() {}

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }
  }
})();
