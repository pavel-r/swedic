'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  });
