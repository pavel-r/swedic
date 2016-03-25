'use strict';

angular.module('swedicApp', [
  'swedicApp.auth',
  'swedicApp.admin',
  'swedicApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'lr.upload'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
