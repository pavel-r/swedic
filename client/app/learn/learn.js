'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.learn', {
        url: '/learn/:id',
        templateUrl: 'app/learn/learn.html',
        controller: 'LearnCtrl',
        controllerAs: 'learn'
      });
  });
