'use strict';

(function() {

class MainController {

  constructor($http, dictionarys) {
    var self = this;
    self.dictionarysDao = dictionarys;

    self.dictionarys = [];

    dictionarys.getDictionarys().then(data => {
      self.dictionarys = data;
    });
  }

  addDictionary(name) {
    var self = this;
    if (name) {
      self.dictionarysDao.addDictionary({name : name}).then(data => {
        self.dictionarys = data;
      });
    }
  }

  deleteDictionary(dictionary) {
    var self = this;
    self.dictionarysDao.deleteDictionary(dictionary).then(data => {
      self.dictionarys = data;
    });
  }
}

angular.module('swedicApp')
  .controller('MainController', MainController);

})();
