'use strict';

(function() {

class ViewController {

  constructor($stateParams, dictionarys, $cookies) {
    var self = this;
  	self.$stateParams = $stateParams;
  	self.$cookies = $cookies;
    self.dictioanrysDao = dictionarys;
    self.dictionary = undefined;

    dictionarys.getDictionaryById($stateParams.id).then(data => {
      self.dictionary = data;
    });
  }

}

angular.module('swedicApp')
  .controller('ViewController', ViewController);

})();
