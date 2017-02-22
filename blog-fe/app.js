'use strict';

// Declare app level module which depends on filters, and services

angular
  .module('sugerpocket', [
    'ngResource',
    'ui.router',
    'sugerpocket.blog',
    'sugerpocket.assignment'
  ]);
