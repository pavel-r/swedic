'use strict';

angular.module('swedicApp')
  .controller('EditCtrl', function ($scope, $stateParams, $http) {
  	this.$http = $http;
  	$scope.editing = false;

  	this.$http.get('/api/dictionarys/' + $stateParams.id).then(response => {
  		$scope.dictionary = response.data;
  	});

  	this.addNewCard = function(){
  		$scope.editing = true;
  	};

    $scope.message = 'Hello';
  });
