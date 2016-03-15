'use strict';

angular.module('swedicApp')
  .service('translate', function ($http, $sce) {
    var self = this;
    
    self.translate = function(card){
      return $http.get('/api/integration/translate/' + card.name)
      .then(response => {
        return response.data.htmlData;
      })
      .then(htmlData => {
        var resp = {};
        resp.trustedHtml = $sce.trustAsHtml(htmlData);
        resp.translation = $(htmlData).find('span[lang=ru_RU]').first().text();
        resp.soundUrl = $(htmlData).find('a').first().attr('href');
        return resp;
      });
    };
  });
