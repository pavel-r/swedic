'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.dictionarys = [];

    $http.get('/api/dictionarys').then(response => {
      this.dictionarys = response.data;
    });
  }

  addDictionary(name) {
    if (name) {
      this.$http.post('/api/dictionarys', { name: name }).then(() => {
        return this.$http.get('/api/dictionarys');
      }).then(response => {
        this.dictionarys = response.data;
      });
    }
    return false;//revent default
  }

  deleteDictionary(dictionary) {
    this.$http.delete('/api/dictionarys/' + dictionary._id).then(() => { // jshint ignore:line
      return this.$http.get('/api/dictionarys');
    }).then(response => {
      this.dictionarys = response.data;
    });
    return false;//prevent default
  }
}

angular.module('swedicApp')
  .controller('MainController', MainController);

})();
