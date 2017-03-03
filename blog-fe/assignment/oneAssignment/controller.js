'use strict';

(function() {

  angular
    .module('sugerpocket.assignment')
    .controller('oneAssignmentCtrl', oneAssignmentCtrl);

  oneAssignmentCtrl.$inject = ['$scope', '$stateParams', '$resource', 'FileUploader', 'Notification', '$state'];

  function oneAssignmentCtrl($scope, $stateParams, $resource, FileUploader, Notification, $state) {
    const vm = this;

    activate();

    ///////////////工具函数
    function getAssignment() {
      let data = {};

      function success(result) {
        vm.aid = result.data.aid;
        vm.start = result.data.start;
        vm.title = result.data.title;
        vm.ddl = result.data.ddl;
        vm.type = result.data.type;
        vm.week = result.data.week;
        vm.promulgatorMeta = result.data.promulgatorMeta;
        vm.content = result.data.content;
        vm.fileEntry = result.data.fileEntry;

        
      }

      function error(err) {
        Notification.error(err.msg);
        if (err.status === 'AUTHENTICATION_ERROR') $scope.$emit('logout');
        $state.go('blog.list');
      }

      let promise = vm.api.oneAssignment.get(data).$promise;

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

    function initUploader() {
      let uploader = new FileUploader({
        url: '/api/assignment/one/' + $stateParams.assignmentId + '/file',
        queueLimit: 1,     //文件个数 
        removeAfterUpload: true   //上传后删除文件
      });

      let success = (result) => {
        Notification.success(result.msg);
      };

      let error = (err) => {
        Notification.error(err.msg);
        if (err.status === 'AUTHENTICATION_ERROR') $state.go('blog.list');
      };

      uploader.onSuccessItem = (fileItem, result, status, headers) => {
        if (result.status && result.status === 'OK') success(result);
        else if (result.status) error(result);
        else {
          Notification.error('发生未知错误');
        }
      };

      uploader.onCompleteAll = () => {
        console.log(uploader.queue);
        $scope.$digest();
      };

      return uploader;
    }
    //////////////事件处理

    //////////////资源
    function initResource() {
      vm.api = {};
      vm.api.oneAssignment = $resource('/api/assignment/one/:assignmentId', {
        assignmentId: $stateParams.assignmentId
      });
    }

    //////////////初始化变量
    function initVariable() {
      vm.aid = $stateParams.assignmentId;
      vm.start = new Date();
      vm.title = '暂无标题';
      vm.ddl = new Date();
      vm.type = '没有类型';
      vm.week = '1';
      vm.promulgatorMeta = {
        username: '无'
      };
      vm.content = '没有内容';
      vm.fileEntry = {
        allowable: false,
        maxSize: 0
      };

      vm.uploader = initUploader();
    }

    //////////////使用参数初始化变量
    function initParamsVariable() {}

    //////////////添加各种watch
    function initWatchEvent() {}

    /////////////初始化Dom
    function initDom() {
      getAssignment();
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
