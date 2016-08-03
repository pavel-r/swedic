'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'My',
    'state': 'main'
  }, {
    'title': 'Public',
    'state': 'public'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('swedicApp')
  .controller('NavbarController', NavbarController);
