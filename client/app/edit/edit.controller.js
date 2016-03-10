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

  addCard(name) {
    if (name) {
      var newCard = {name : name };
    	this.dictionary.cards.push(newCard);
      	this.$http.post('/api/dictionarys/' + this.dictionary._id + '/cards', newCard).then(response => {
        	this.dictionary = response.data;
      	});
    }
  }

  deleteCard(card) {
    if(card){
    	this.dictionary.cards = this.dictionary.cards.filter( c => {
    		return c !== card;
    	});
    	this.$http.delete('/api/dictionarys/' + this.dictionary._id + '/cards/' + card._id).then(response => {
        	this.dictionary = response.data;
      	});
    }
  }
}

angular.module('swedicApp')
  .controller('EditController', EditController);

})();
