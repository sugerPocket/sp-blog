'use strict';

(function () {

  angular.module('myApp').controller('sp-header-menu', ctrlFn);

  ctrlFn.$inject = [];
  function ctrlFn() {
    var vm = this;

    activate();

    ///////////////工具函数
    function tagFactory(name, state) {
      return {
        name: name,
        active: false,
        state: state
      };
    }

    function getTags() {
      var tagArr = [{ name: 'Home', state: '' }, { name: 'Blog', state: '' }, { name: 'Homework', state: '' }];

      var tags = {};
      tagArr.forEach(function (tag, index) {
        tags[tag.name] = tagFactory(tag.name, tag.state);
      });

      tags['Home'].active = true; //初始化

      return tags;
    }

    function toggleActiveTag(tagName) {
      if (vm.tags[tagName] && vm.tags[vm.activeTagName]) {
        vm.tags[vm.activeTagName].active = false;
        vm.tags[tagName].active = true;
        vm.activeTagName = tagName;
        return true;
      } else return false;
    }

    //////////////事件处理
    vm.toggleFirstState = function ($event, tagName) {
      toggleActiveTag(tagName);
    };

    //////////////资源

    //////////////初始化变量
    function initVariable() {
      vm.tags = getTags();
      vm.activeTagName = 'Home';
    }

    function activate() {
      initVariable();
    }
  }
})();