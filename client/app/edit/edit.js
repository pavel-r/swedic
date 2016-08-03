'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.edit', {
        url: '/edit/:id',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditController',
        controllerAs: 'edit'
      });
  });
