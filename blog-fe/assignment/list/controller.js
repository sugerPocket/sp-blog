'use strict';

(function() {

  angular
    .module('sugerpocket.assignment')
    .controller('assignmentListCtrl', assignmentListCtrl);

  assignmentListCtrl.$inject = ['$scope'];

  function assignmentListCtrl($scope) {
    const vm = this;

    activate();

    ///////////////工具函数

    //////////////事件处理

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {
      vm.editorOpts = {};
      vm.editorContent = '# test';
      $scope.$watch('editorContent', function (newVal, oldVal) {
        console.log(newVal);
      });
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {}

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
