'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('public.view', {
        url: '/view/:id',
        templateUrl: 'app/view/view.html',
        controller: 'ViewController',
        controllerAs: 'view'
      });
  });
