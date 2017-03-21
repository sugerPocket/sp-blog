'use strict';

(function () {
  angular
    .module('sugerpocket')
    .service('sugerpocketRoute', sugerpocketRoute);
  
  sugerpocketRoute.$inject = ['$rootScope', '$state'];
  function sugerpocketRoute($rootScope, $state) {
    let service = {};

    function getCurrent() {
      return $state.current.name.split('.');
    }

    service.getCurrent = getCurrent;

    return service;
  }
})();
