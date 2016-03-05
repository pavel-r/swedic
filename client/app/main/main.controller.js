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
      this.$http.post('/api/dictionarys', { name: name });
    }
  }

  deleteDictionary(dictionary) {
    this.$http.delete('/api/dictionarys/' + dictionary._id);
  }
}

angular.module('swedicApp')
  .controller('MainController', MainController);

})();
