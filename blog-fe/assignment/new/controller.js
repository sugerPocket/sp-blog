'use strict';

(function() {

  angular
    .module('sugerpocket.assignment')
    .controller('newAssignmentCtrl', newAssignmentCtrl);

  newAssignmentCtrl.$inject = ['$scope', '$resource', '$window', '$element'];

  function newAssignmentCtrl($scope, $resource, $window, $element) {
    const vm = this;

    activate();

    ///////////////工具函数
    function createOneAssignment() {
      let title = vm.title;
      let content = vm.assignmentContent;
      let type = vm.assignmentType;
      let week = vm.week;
      let fileEntry = angular.extend({}, vm.fileEntry);

      let data = {
        title,
        content,
        type,
        week,
        fileEntry
      };

      
    }
    //////////////事件处理

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {
      vm.title = '';
      vm.assignmentContent = '';

      let assignmentTypes = vm.assignmentTypes = ['Computer Organization', 'Database', 'Operating System'];
      vm.assignmentType = assignmentTypes[0];
      
      let weeks = vm.weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
      vm.week = weeks[0];

      vm.fileEntry = {
        allowable: false,
        maxSize: 0,
        nameRegExp: ''
      };
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {}

    //////////////添加各种watch
    function initWatchEvent() {
      console.log($window);
      vm.configEditorSize = (mde) => {
        console.log(mde);
      };
    }

    function activate() {
      initVariable();
      initResource();
      initParamsVariable();
      initWatchEvent();
    }
  }
})();
