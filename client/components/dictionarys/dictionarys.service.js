'use strict';

angular.module('swedicApp')
  .service('dictionarys', function ($q, $http) {
    var self = this;

    // var dictionarysCache;

    this.getDictionarys = function(){
      return $http.get('/api/dictionarys').then(response => {
        // dictionarysCache = response.data;
        return response.data;
      });
    };

    this.getDictionaryById = function(id){
      return $http.get('/api/dictionarys/' + id).then(response => {
        return response.data;
      });
    };

    this.addDictionary = function(dictionary) {
      var self = this;
      return $http.post('/api/dictionarys', dictionary)
        .then(self.getDictionarys);
    };
    // this.getDictionarys = function(){
    //   if(dictionarysCache){
    //     return $q.when(dictionarysCache);
    //   } else {
    //     return self.loadDictionarys();
    //   }
    // };
    
    this.deleteDictionary = function(dictionary){
      return $http.delete('/api/dictionarys/' + dictionary._id) // jshint ignore:line
        .then(self.getDictionarys);
    };
    
    this.addCardToDictionary = function(dictionary, newCard){
      // dictionary.cards.push(newCard);
      return $http.post('/api/dictionarys/' + dictionary._id + '/cards', newCard).then(response => {
        	return response.data;
      });
    };
    
    this.deleteCardFromDictionary = function(dictionary, card) {
    //   dictionary.cards = dictionary.cards.filter( c => {
    // 		return c !== card;
    // 	});
    	return $http.delete('/api/dictionarys/' + dictionary._id + '/cards/' + card._id).then(response => {
        	return response.data;
      });
    };
    
    this.updateCardInDictionary = function(dictionary, card) {
    //   dictionary.cards = dictionary.cards.filter( c => {
    // 		return c !== card;
    // 	});
    	return $http.put('/api/dictionarys/' + dictionary._id + '/cards/' + card._id, card).then(response => {
        	return response.data;
      });
    };
  });
