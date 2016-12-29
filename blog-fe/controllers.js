'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    then(function (response) {
      $scope.posts = response.data.posts;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      then(function (response) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    then(function (response) {
      $scope.post = response.data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    then(function (response) {
      $scope.form = response.data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      then(function (response) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    then(function (response) {
      $scope.post = response.data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      then(function (response) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
