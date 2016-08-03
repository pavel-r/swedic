'use strict';

(function() {

class EditCardController {

  constructor($stateParams, $state, dictionarys, translate) {
    var self = this;
    self.$state = $state;
  	self.$stateParams = $stateParams;
    self.dictioanrysDao = dictionarys;
    self.translateService = translate;

    dictionarys.getDictionaryById($stateParams.id).then(dictionary => {
      self.dictionary = dictionary;
      self.card = dictionary.cards.filter(c => c._id === self.$stateParams.cardId)[0];
    });
  }

  goToEditState(){
    this.$state.go('main.edit', {id : this.$stateParams.id});
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
  
  translateCard(card) {
    var self = this;
    self.translateService.translate(card).then(resp => {
      card.translation = resp.translation;
      card.soundUrl = resp.soundUrl;
      self.translationHtml = resp.trustedHtml;
    });
  }
}

angular.module('swedicApp')
  .controller('EditCardController', EditCardController);

})();
