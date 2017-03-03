'use strict';

(function() {

  angular
    .module('sugerpocket.assignment')
    .controller('assignmentListCtrl', assignmentListCtrl);

  assignmentListCtrl.$inject = ['$scope', '$resource', '$state', 'Notification'];

  function assignmentListCtrl($scope, $resource, $state, Notification) {
    const vm = this;

    activate();

    ///////////////工具函数
    function getAssignmentList() {
      let data = {};

      function success(result) {
        vm.assignmentsList = result.data;
      }

      function error(err) {
        Notification.error(err.msg);
        if (err.status === 'AUTHENTICATION_ERROR') $scope.$emit('logout');
        $state.go('blog.list');
      }

      let promise = vm.api.list.get(data).$promise;

      promise
        .then(result => {
          if (result.status === 'OK') success(result);
          else error(result);
        })
        .catch(err => {
          Notification.error(err);
          $state.go('blog.list');
        });
    }

    //////////////事件处理

    //////////////资源
    function initResource() {
      vm.api = {};
      vm.api.list = $resource('/api/assignment/list');
    }

    //////////////初始化变量
    function initVariable() {
      vm.assignmentsList = [];
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {}

    //////////////添加各种watch
    function initWatchEvent() {}

    //////////////初始化Dom
    function initDom() {
      getAssignmentList();
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
