'use strict';

(function() {

  angular
    .module('sugerpocket.assignment')
    .controller('newAssignmentCtrl', newAssignmentCtrl);

  newAssignmentCtrl.$inject = ['$scope', '$resource', '$window', '$element', '$state', 'Notification'];

  function newAssignmentCtrl($scope, $resource, $window, $element, $state, Notification) {
    const vm = this;

    activate();

    ///////////////工具函数
    function createOneAssignment() {
      let title = vm.title;
      let content = vm.assignmentContent;
      let type = vm.assignmentTypes.indexOf(vm.assignmentType);
      let week = vm.week;
      let ddl = moment(vm.ddl);
      let fileEntry = angular.extend({}, vm.fileEntry);

      let data = {
        title,
        content,
        type,
        ddl,
        week,
        fileEntry
      };

      function success(result) {
        $state.go('assignment.list');
        Notification.success(result.msg);
      }

      function error(err) {
        Notification.error(err.msg);
      }

      let promise = vm.api.newAssignment.save(data).$promise;

      promise
        .then((result) => {
          if (result.status === 'OK') success(result);
          else error(result);
        })
        .catch(err => {
          $state.go('assignment.list');
          Notification.error(err.msg);
        });
    }
    //////////////事件处理

    vm.create = () => createOneAssignment();

    //////////////资源
    function initResource() {
      vm.api = {};
      vm.api.newAssignment = $resource('/api/assignment/new');
    }

    //////////////初始化变量
    function initVariable() {
      vm.title = '';
      vm.assignmentContent = '';

      let assignmentTypes = vm.assignmentTypes = ['Computer Organization', 'Database', 'Operating System'];
      vm.assignmentType = assignmentTypes[0];
      
      let weeks = vm.weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
      vm.week = weeks[0];

      vm.ddl = '';

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
      vm.configEditorSize = (mde) => {
        
      };
    }

    //////////////初始化Dom
    function initDom() {
      let picker = $('#sp-assignment-new .datepicker').datetimepicker({
        locale: 'en-gb',
        format: 'YYYY/MM/DD HH:mm'
      });
      picker.on('dp.change', ($event) => {
        vm.ddl = moment($event.date).format('YYYY/MM/DD HH:mm');
        $scope.$digest();
      });
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
