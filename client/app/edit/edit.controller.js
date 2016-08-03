'use strict';

(function() {

class EditController {

  constructor($http, $stateParams, dictionarys, $cookies) {
    var self = this;
  	self.$stateParams = $stateParams;
  	self.$cookies = $cookies;
    self.dictioanrysDao = dictionarys;
    self.dictionary = undefined;

    dictionarys.getDictionaryById($stateParams.id).then(data => {
      self.dictionary = data;
    });
  }

  deleteCard(card) {
    var self = this;
    if(card){
      self.dictioanrysDao.deleteCardFromDictionary(self.dictionary, card).then(updatedDictionary => {
        self.dictionary = updatedDictionary;
      });
    }
  }

  resetDic(dictionary) {
    var self = this;
    if(dictionary){
      self.dictioanrysDao.resetDictionary(dictionary).then(updatedDictionary => {
        self.dictionary = updatedDictionary;
      });
    }
  }
  
  togglePublic(dictionary) {
    var self = this;
    if(dictionary){
      self.dictioanrysDao.updateDictionary({_id : dictionary._id, isPublic: !dictionary.isPublic}).then(updatedDictionary => {
        self.dictionary = updatedDictionary;
      });
    }
  }
}

angular.module('swedicApp')
  .controller('EditController', EditController);

})();
