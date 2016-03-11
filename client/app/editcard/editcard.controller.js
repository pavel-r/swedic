'use strict';

(function() {

class EditCardController {

  constructor($http, $stateParams, $state, dictionarys) {
    var self = this;
    self.$state = $state;
  	self.$stateParams = $stateParams;
    self.dictioanrysDao = dictionarys;
    self.dictionary = undefined;
    self.card = {};

    dictionarys.getDictionaryById($stateParams.id).then(dictionary => {
      self.dictionary = dictionary;
      self.card = dictionary.cards.find(c => {
        return c._id === self.$stateParams.cardId;
      });
    });
  }

  goToEditState(){
    this.$state.go('edit', {id : this.$stateParams.id});
  }

  saveCard(card) {
    var self = this;
    if (card._id) {
      self.dictioanrysDao.updateCardInDictionary(self.dictionary, card)
        .then(() => {
          self.goToEditState();
        });
    } else {
      self.dictioanrysDao.addCardToDictionary(self.dictionary, card)
        .then(() => {
          self.goToEditState();
        });
    }
  }
  
}

angular.module('swedicApp')
  .controller('EditCardController', EditCardController);

})();
