'use strict';

angular.module('swedicApp')
  .controller('EditCtrl', function ($scope, $stateParams, $http) {
  	this.$http = $http;

  	this.$http.get('/api/dictionarys/' + $stateParams.id).then(response => {
  		this.dictionary = response.data;
  	});
  	
    $scope.message = 'Hello';
  });
