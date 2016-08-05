'use strict';

angular.module('swedicApp')
  .controller('OauthButtonsController', function ($window) {
    this.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
});

angular.module('swedicApp')
  .directive('oauthButtons', () => ({
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsController',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    }));
