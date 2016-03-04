'use strict';

angular.module('swedicApp.auth', [
  'swedicApp.constants',
  'swedicApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
