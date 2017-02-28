'use strict';

// Declare app level module which depends on filters, and services

angular
  .module('sugerpocket', [
    'ngResource',
    'ui.router',
    'ngSanitize',
    'yaru22.md',
    'sugerpocket.blog',
    'sugerpocket.assignment'
  ]);
