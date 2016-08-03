'use strict';

angular.module('swedicApp')
  .service('dictionarys', function ($q, $http) {
    var self = this;

    var dictionarysCache;

    function invalidateCache(){
      dictionarysCache = null;
    }
    
    function setDictionarysCache(data){
      dictionarysCache = data;
    }

    this.getDictionarys = function(){
      if(dictionarysCache){
        return $q.when(dictionarysCache);
      } else {
        return $http.get('/api/dictionarys').then(response => {
          setDictionarysCache(response.data);
          return response.data;
        });
      }
    };

    this.getPublicDictionarys = function() {
      return $http.get('api/dictionarys/public').then(response => {
        return response.data;
      });
    };

    this.getDictionaryById = function(id){
      if(dictionarysCache){
        var dictionary = dictionarysCache.filter((d) => { 
          return d._id === id;
        })[0];
        if(dictionary){
          return $q.when(dictionary);
        } else {
          invalidateCache();
        }
      }
      return $http.get('/api/dictionarys/' + id).then(response => {
        return response.data;
      });
    };

    this.addDictionary = function(dictionary) {
      var self = this;
      invalidateCache();
      return $http.post('/api/dictionarys', dictionary)
        .then(self.getDictionarys);
    };
    
    this.deleteDictionary = function(dictionary){
      invalidateCache();
      return $http.delete('/api/dictionarys/' + dictionary._id) // jshint ignore:line
        .then(self.getDictionarys);
    };
    
    this.addCardToDictionary = function(dictionary, newCard){
      invalidateCache();
      // dictionary.cards.push(newCard);
      return $http.post('/api/dictionarys/' + dictionary._id + '/cards', newCard).then(response => {
        	return response.data;
      });
    };
    
    this.deleteCardFromDictionary = function(dictionary, card) {
      invalidateCache();
    //   dictionary.cards = dictionary.cards.filter( c => {
    // 		return c !== card;
    // 	});
    	return $http.delete('/api/dictionarys/' + dictionary._id + '/cards/' + card._id).then(response => {
        	return response.data;
      });
    };
    
    this.updateDictionary = function(dictionary) {
      invalidateCache();
      return $http.put('/api/dictionarys/' + dictionary._id, dictionary).then(response => {
        return response.data;
      });
    };

    this.updateCardInDictionary = function(dictionary, card) {
      invalidateCache();
    //   dictionary.cards = dictionary.cards.filter( c => {
    // 		return c !== card;
    // 	});
    	return $http.put('/api/dictionarys/' + dictionary._id + '/cards/' + card._id, card).then(response => {
        	return response.data;
      });
    };
    
    this.resetDictionary = function(dictionary) {
      invalidateCache();
      return $http.put('/api/dictionarys/' + dictionary._id + '/reset').then(response => {
          return response.data;
      });
    };
  });
