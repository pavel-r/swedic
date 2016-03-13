'use strict';

(function() {

class LearnCtrl {

  constructor($http, $stateParams, $state, dictionarys) {
    var self = this;
    self.$state = $state;
  	self.$stateParams = $stateParams;
    self.dictioanrysDao = dictionarys;

    dictionarys.getDictionaryById($stateParams.id).then(dictionary => {
      self.dictionary = dictionary;
      self.resetCards();
    });
  }

  resetCards() {
    var self = this;
    self.cards = _.shuffle(self.dictionary.cards.filter(c => {
        return !c.learnt;
    }));
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
  
  nextCard(){
    var self = this;
    self.showTranslation = false;
    if(self.cards.length === 0) {
      self.resetCards();
    } else {
      self.card = self.cards.pop();
    }
  }
  
}

angular.module('swedicApp')
  .controller('LearnCtrl', LearnCtrl);

})();
