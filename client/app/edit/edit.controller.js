'use strict';

(function() {

class EditController {

  constructor($http, $stateParams) {
  	this.$stateParams = $stateParams;
    this.$http = $http;
    this.dictionary = undefined;
    this.editing = false;

    $http.get('/api/dictionarys/' + $stateParams.id).then(response => {
  		this.dictionary = response.data;
  	});
  }

  addNewCard(name) {
    if (name) {
    	this.dictionary.cards.push({name : name});
      	this.$http.put('/api/dictionarys/' + this.dictionary._id, this.dictionary).then(response => {
        	this.dictionary = response.data;
      	});
    }
  }

  deleteCard(card) {
    if(card){
    	this.dictionary.cards = this.dictionary.cards.filter( c => {
    		return c !== card;
    	});
    	this.$http.put('/api/dictionarys/' + this.dictionary._id, this.dictionary).then(response => {
        	this.dictionary = response.data;
      	});
    }
  }
}

angular.module('swedicApp')
  .controller('EditController', EditController);

})();
