'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lexinCtrlStub = {
  translate: 'lexinCtrl.translate'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var integrationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lexin.controller': lexinCtrlStub
});

describe('Integration API Router:', function() {

  it('should return an express router instance', function() {
    integrationIndex.should.equal(routerStub);
  });

  describe('GET /api/integration/translate/:word', function() {

    it('should route to lexin.controller.translate', function() {
      routerStub.get
        .withArgs('/translate/:word', 'lexinCtrl.translate')
        .should.have.been.calledOnce;
    });

  });

});
