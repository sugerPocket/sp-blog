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

    //////////////事件处理

    //////////////资源
    function initResource() {}

    //////////////初始化变量
    function initVariable() {
      vm.title = '';

      let assignmentTypes = vm.assignmentTypes = ['Computer Organization', 'Database', 'Operating System'];
      vm.assignmentType = assignmentTypes[0];
      
      let weeks = vm.weeks = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty One'];
      vm.week = weeks[0];
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
