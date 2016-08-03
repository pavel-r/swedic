'use strict';

(function() {

angular.module('swedicApp.auth')
  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {
      next.data = next.data || {};
      if (!next.data.authenticate) {
        return;
      }

      if (typeof next.data.authenticate === 'string') {
        Auth.hasRole(next.data.authenticate, _.noop).then(has => {
          if (has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn(_.noop).then(is => {
            $state.go(is ? 'main' : 'login');
          });
        });
      } else {
        Auth.isLoggedIn(_.noop).then(is => {
          if (is) {
            return;
          }

          event.preventDefault();
          $state.go('login');
        });
      }
    });
  });

})();
