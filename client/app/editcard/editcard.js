'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.editcard', {
        url: '/edit/:id/card/:cardId',
        templateUrl: 'app/editcard/editcard.html',
        controller: 'EditCardController',
        controllerAs: 'editcard'
      });
  });
