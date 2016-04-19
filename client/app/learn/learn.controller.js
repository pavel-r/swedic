'use strict';

(function() {

class LearnCtrl {

  constructor($http, $stateParams, $state, dictionarys, translate) {
    var self = this;
    self.$state = $state;
  	self.$stateParams = $stateParams;
    self.dictioanrysDao = dictionarys;
    self.translateService = translate;
    self.editMode = false;

    dictionarys.getDictionaryById($stateParams.id).then(dictionary => {
      self.dictionary = dictionary;
      self.resetCards();
    });
  }

  resetCards() {
    var self = this;
    self.cards = _.shuffle(self.dictionary.cards.filter(c => !c.learnt));
    self.totalCardsToLearn = self.cards.length;
    if(self.cards.length === 0){
      self.$state.go('edit', {id : self.$stateParams.id});
    } else {
      self.nextCard();
    }
  }

  learnCard(card) {
    var self = this;
    self.card.learnt = true;
    self.dictioanrysDao.updateCardInDictionary(self.dictionary, card).then(() =>{
      self.nextCard();
    });
  }

  editCard(card) {
    var self = this;
    self._cardName = card.name;
    self._cardTranslation = card.translation;
    self.editMode = true;
  }

  saveCard(card) {
    var self = this;
    card.name = self._cardName;
    card.translation = self._cardTranslation;
    self.dictioanrysDao.updateCardInDictionary(self.dictionary, card).then(() =>{
      self.editMode = false;
    });
  }

  nextCard(){
    var self = this;
    self.showTranslation = false;
    self.translationHtml = '';
    if(self.cards.length === 0) {
      self.resetCards();
    } else {
      self.card = self.cards.pop();
    }
  }
  
  translateCard(card) {
    var self = this;
    self.translateService.translate(card).then(resp => {
      self.translationHtml = resp.trustedHtml;
    });
  }

  play(){
    var self = this;
    document.getElementById('player').src = self.card.soundUrl;
    document.getElementById('player').play();
  }
}

angular.module('swedicApp')
  .controller('LearnCtrl', LearnCtrl);

})();
