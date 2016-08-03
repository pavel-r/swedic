'use strict';

angular.module('swedicApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        template: '<ui-view/>',
        data: {authenticate: true}
      })
      .state('main.list', {
        url: '/list',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
