'use strict';

angular.module('swedicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('learn', {
        url: '/learn/:id',
        templateUrl: 'app/learn/learn.html',
        controller: 'LearnCtrl'
      });
  });
