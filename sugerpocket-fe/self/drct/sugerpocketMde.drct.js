'use strict';

(function () {
  angular
    .module('sugerpocket')
    .directive('spMde', spMdeDrct);
    
  spMdeDrct.$injector = ['$parse'];
  function spMdeDrct($parse) {

    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        onLoad: '='
      },
      compile: (tElement, tAttrs, transclude) => {
        if (tElement[0].tagName !== 'TEXTAREA') throw Error('mde require textarea!');
        if (!window.CodeMirror) throw Error('mde require codemirror!');
        return spMdeLink;
      }
    };

    function spMdeLink(scope, iElement, iAttrs, ngModel) {
      let modelName = iAttrs.ngModel;
      let mde = new SimpleMDE(iElement[0]);
      if (angular.isFunction(scope.onLoad)) {
        scope.onLoad(mde);
      }
      if (ngModel) configNgModel(scope, mde, ngModel, modelName);
    }

    function configNgModel(scope, mde, ngModel, modelName) {
      let getter = $parse(modelName);
      let setter = getter.assign;

      scope.$watch(modelName, (newVal, oldVal) => {
        setter(scope.$parent, newVal);
      });
      scope.$parent.$watch(modelName, (newVal, oldVal) => {
        setter(scope, newVal);
      });

      /* 验证model的合法性 */
      ngModel.$formatters.push(function (modelValue) {
        if (!modelValue) {
          return '';
        }
        else if (angular.isArray(modelValue) || angular.isObject(modelValue)) {
          throw Error('an array or an object can not be a model of mdeditor');
        }
        return modelValue;
      });

        /* 渲染视图 */
      ngModel.$render = function () {
        let oldValue = mde.codemirror.getValue();
        if (ngModel.$viewValue !== oldValue) {
          mde.value(ngModel.$viewValue);
        }
      };

      /* 绑定codemirror事件 同步view */
      mde.codemirror.on('change', function(instance) {
        let newValue = instance.getValue();
        if (newValue !== ngModel.$viewValue) {
          scope.$evalAsync(function () {
            ngModel.$setViewValue(newValue);
          });
        }
      });
    }
  }
})();
