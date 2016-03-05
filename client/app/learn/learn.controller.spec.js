'use strict';

describe('Controller: LearnCtrl', function () {

  // load the controller's module
  beforeEach(module('swedicApp'));

  var LearnCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearnCtrl = $controller('LearnCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
