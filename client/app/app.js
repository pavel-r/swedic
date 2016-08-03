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
      .otherwise('/main');
    $urlRouterProvider.when('/main', '/main/list');
    $urlRouterProvider.when('/public', '/public/list');

    $locationProvider.html5Mode(true);
  });
